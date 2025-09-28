"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProjectModal from "./project-modal"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: number
  image: string
  title: string
  category: string
  description: string
  details: string
  images: string[]
  location: string
  year: string
  surface: string
}

const projets: Project[] = [
  {
    id: 1,
    image: "/modern-villa-with-large-glass-windows-aluminum-fra.jpg",
    title: "Villa Moderne & Baies Vitrées",
    category: "Fenêtres",
    description:
      "Réalisation d'une villa contemporaine avec de grandes baies vitrées en aluminium, offrant une luminosité exceptionnelle et une vue panoramique sur le jardin.",
    details:
      "Ce projet comprend l'installation de fenêtres coulissantes à galandage, de portes-fenêtres et de verrières d'atelier. Les profilés aluminium haute performance garantissent une isolation thermique optimale.",
    images: ["/aluminum-window-detail.jpg", "/glass-sliding-door.jpg", "/modern-window-frame.jpg"],
    location: "Lyon, France",
    year: "2024",
    surface: "180 m²",
  },
  {
    id: 2,
    image: "/commercial-building-glass-facade-aluminum.jpg",
    title: "Façade Vitrée Commerciale",
    category: "Façades",
    description:
      "Conception et installation d'une façade entièrement vitrée pour un bâtiment commercial, alliant esthétique moderne et performance énergétique.",
    details:
      "Façade rideau avec système de fixation invisible, verres à contrôle solaire et ventilation naturelle intégrée. Structure aluminium haute résistance aux intempéries.",
    images: ["/curtain-wall-facade.jpg", "/aluminum-facade-detail.jpg", "/modern-commercial-building.png"],
    location: "Paris, France",
    year: "2023",
    surface: "450 m²",
  },
  {
    id: 3,
    image: "/interior-glass-partition-office-aluminum.jpg",
    title: "Cloisons Vitrées d'Intérieur",
    category: "Cloisons",
    description:
      "Aménagement d'espaces de bureaux avec des cloisons vitrées style atelier, créant des espaces lumineux tout en préservant l'intimité.",
    details:
      "Cloisons amovibles avec profilés aluminium fins, verres feuilletés acoustiques et système d'ouverture coulissante. Design épuré et fonctionnel.",
    images: ["/office-glass-partition.jpg", "/sliding-glass-door-office.jpg", "/aluminum-frame-detail.jpg"],
    location: "Marseille, France",
    year: "2024",
    surface: "120 m²",
  },
  {
    id: 4,
    image: "/panoramic-windows-pool-house-aluminum.jpg",
    title: "Fenêtres Panoramiques Pool House",
    category: "Fenêtres",
    description:
      "Installation de fenêtres panoramiques pour un pool house, offrant une vue imprenable sur la piscine et le jardin environnant.",
    details:
      "Fenêtres à frappe avec ouvrants cachés, verres haute performance et profilés aluminium thermolaqués. Étanchéité renforcée pour environnement humide.",
    images: ["/pool-house-windows.jpg", "/panoramic-view-window.jpg", "/aluminum-window-pool.jpg"],
    location: "Nice, France",
    year: "2023",
    surface: "85 m²",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=400&width=600",
    title: "Portes-Fenêtres & Pergola",
    category: "Pergolas",
    description:
      "Création d'un ensemble harmonieux avec portes-fenêtres et pergola bioclimatique en aluminium pour une terrasse contemporaine.",
    details:
      "Pergola à lames orientables motorisées, portes-fenêtres coulissantes à seuil plat et éclairage LED intégré. Finition thermolaquée résistante aux UV.",
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
    location: "Cannes, France",
    year: "2024",
    surface: "95 m²",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=400&width=600",
    title: "Porte d'Entrée Design",
    category: "Portes",
    description:
      "Porte d'entrée sur-mesure en aluminium avec design contemporain, alliant sécurité et esthétique pour une maison moderne.",
    details:
      "Porte blindée avec panneau aluminium thermolaqué, serrure multipoints et vitrage sécurisé. Isolation thermique et phonique renforcée.",
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
    location: "Toulouse, France",
    year: "2024",
    surface: "3 m²",
  },
]

const categories = ["Tous", "Fenêtres", "Portes", "Façades", "Pergolas", "Cloisons"]

export default function RealisationsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProjects =
    selectedCategory === "Tous" ? projets : projets.filter((projet) => projet.category === selectedCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".header-content", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
      })

      gsap.from(".filter-button", {
        opacity: 0,
        scale: 0.8,
        y: 30,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        delay: 0.5,
      })

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          rotationX: 15,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: index * 0.1,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [filteredProjects])

  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return

    gsap.to(".project-card", {
      opacity: 0,
      scale: 0.9,
      rotationY: 10,
      duration: 0.4,
      ease: "power2.in",
      stagger: 0.05,
      onComplete: () => {
        setSelectedCategory(category)
        gsap.fromTo(
          ".project-card",
          { opacity: 0, scale: 0.9, rotationY: -10 },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.5,
            ease: "back.out(1.2)",
            stagger: 0.08,
            delay: 0.1,
          },
        )
      },
    })
  }

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const nextProject = () => {
    if (!selectedProject) return
    const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject.id)
    const nextIndex = (currentIndex + 1) % filteredProjects.length
    setSelectedProject(filteredProjects[nextIndex])
  }

  const prevProject = () => {
    if (!selectedProject) return
    const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject.id)
    const prevIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1
    setSelectedProject(filteredProjects[prevIndex])
  }

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <div className="business-alu-header relative py-28 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="header-content text-6xl md:text-7xl font-bold text-foreground mb-8 text-balance tracking-tight">
            Nos Réalisations
          </h1>
          <p className="header-content text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Découvrez l'excellence de nos solutions en aluminium à travers une sélection de nos projets les plus
            remarquables, alliant innovation technique et design contemporain.
          </p>
        </div>
      </div>

      <div className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="glass-effect rounded-2xl p-8 mx-auto max-w-4xl">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category)}
                  className="filter-button filter-button-enhanced px-8 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((projet) => (
              <div
                key={projet.id}
                className="project-card project-card-enhanced group cursor-pointer rounded-2xl overflow-hidden"
                onClick={() => openModal(projet)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={projet.image || "/placeholder.svg"}
                    alt={projet.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                      <span className="inline-block px-4 py-2 bg-primary/30 backdrop-blur-md text-primary-foreground text-xs font-bold rounded-full mb-4 border border-white/20">
                        {projet.category}
                      </span>
                      <h3 className="text-white text-2xl font-bold leading-tight mb-3">{projet.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-2">{projet.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={nextProject}
        onPrev={prevProject}
      />
    </div>
  )
}
