export interface CloudinaryResource {
  public_id: string
  secure_url: string
  resource_type: "image" | "video"
  width: number
  height: number
}

export interface PortfolioData {
  birthday: CloudinaryResource[]
  corporate: CloudinaryResource[]
  wedding: CloudinaryResource[]
  babyshower: CloudinaryResource[]
  namingceremony: CloudinaryResource[]
  other: CloudinaryResource[]
}

export const cloudinaryFolders = [
  { id: "birthday", label: "Birthday" },
  { id: "corporate", label: "Corporate" },
  { id: "wedding", label: "Wedding" },
  { id: "babyshower", label: "Baby Shower" },
  { id: "namingceremony", label: "Naming Ceremony" },
  { id: "other", label: "Other" },
]

export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    const response = await fetch("/api/portfolio", {
      cache: "no-store",
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch portfolio data")
      return {
        birthday: [],
        corporate: [],
        wedding: [],
        babyshower: [],
        namingceremony: [],
        other: [],
      }
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching portfolio data:", error)
    return {
        birthday: [],
        corporate: [],
        wedding: [],
        babyshower: [],
        namingceremony: [],
        other: [],
      }
  }
}

export function getVideoThumbnail(publicId: string): string {
  return `https://res.cloudinary.com/djwgwbzxl/video/upload/so_0,w_400,h_300,c_fill,q_auto,f_jpg/${publicId}.jpg`
}

// New: return a playable mp4 URL for a Cloudinary video resource/public id
export function getMp4Url(resourceOrPublicId: CloudinaryResource | string | undefined): string {
  if (!resourceOrPublicId) return ""
  // resource object passed
  if (typeof resourceOrPublicId !== "string") {
    const res = resourceOrPublicId as CloudinaryResource
    if (res.secure_url && res.secure_url.endsWith(".mp4")) return res.secure_url
    if (res.secure_url && res.secure_url.includes("/video/upload/")) {
      return res.secure_url.replace("/upload/", "/upload/q_auto,f_mp4/")
    }
    if (res.public_id) {
      return `https://res.cloudinary.com/djwgwbzxl/video/upload/q_auto,f_mp4/${res.public_id}`
    }
    return res.secure_url || ""
  }

  // publicId string passed
  const publicId = resourceOrPublicId
  return `https://res.cloudinary.com/djwgwbzxl/video/upload/q_auto,f_mp4/${publicId}`
}
