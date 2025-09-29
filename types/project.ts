export interface Project {
    id: number
    title: string
    category: string
    image: string
    images: string[]
    description: string
    details: {
      client: string
      surface: string
      annee: string
      materiau: string
    }
  }
  