import { NextResponse } from "next/server"

export const dynamic = "force-dynamic";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

const PORTFOLIO_FOLDERS = [
  "portfolio/birthday",
  "portfolio/corporate",
  "portfolio/wedding",
  "portfolio/babyshower",
  "portfolio/namingceremony",
  "portfolio/other",
]

interface CloudinaryResource {
  public_id: string
  secure_url: string
  resource_type: "image" | "video"
  width: number
  height: number
}

interface PortfolioResponse {
  birthday: CloudinaryResource[]
  corporate: CloudinaryResource[]
  wedding: CloudinaryResource[]
  babyshower: CloudinaryResource[]
  namingceremony: CloudinaryResource[]
  other: CloudinaryResource[]
}

async function searchCloudinaryFolder(folderPath: string): Promise<CloudinaryResource[]> {
  const auth = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString("base64")

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/djwgwbzxl/resources/search", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expression: `folder:"${folderPath}"`,
        sort_by: [{ created_at: "desc" }],
        max_results: 500,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(
        `[v0] Cloudinary API error for folder ${folderPath}: ${response.status} ${response.statusText}`,
        errorBody,
      )
      return []
    }

    const data = await response.json()
    console.log(`[v0] API response for ${folderPath}:`, data.resources?.length || 0, "items")

    if (!data.resources || data.resources.length === 0) {
      return []
    }

    return data.resources.map((resource: any) => ({
      public_id: resource.public_id,
      secure_url:
        resource.resource_type === "image"
          ? resource.secure_url.replace("/upload/", "/upload/q_auto,f_auto/")
          : `https://res.cloudinary.com/djwgwbzxl/video/upload/q_auto,vc_auto/${resource.public_id}.mp4`,
      resource_type: resource.resource_type,
      width: resource.width,
      height: resource.height,
    }))
  } catch (error) {
    console.error(`[v0] Error fetching resources from ${folderPath}:`, error)
    return []
  }
}

export async function GET() {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return NextResponse.json({ error: "Missing Cloudinary credentials" }, { status: 500 })
  }

  try {
    const results = await Promise.all(PORTFOLIO_FOLDERS.map((folder) => searchCloudinaryFolder(folder)))

    const response: PortfolioResponse = {
      birthday: results[0],
      corporate: results[1],
      wedding: results[2],
      babyshower: results[3],
      namingceremony: results[4],
      other: results[5],
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] Portfolio API error:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio resources" }, { status: 500 })
  }
}
