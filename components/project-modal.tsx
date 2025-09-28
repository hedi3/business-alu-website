"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"

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

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function ProjectModal({ project, isOpen, onClose, onNext, onPrev }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const currentImageRef = useRef(0)

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      // Animation d'ouverture
      gsap.set(modalRef.current, { opacity: 0 })
      gsap.set(contentRef.current, { scale: 0.8, y: 50 })

      gsap.to(modalRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(contentRef.current, { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)", delay: 0.1 })

      // Bloquer le scroll
      document.body.style.overflow = "hidden"
    } else {
      // Restaurer le scroll
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, { scale: 0.8, y: 50, duration: 0.3, ease: "power2.in" })
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      })
    } else {
      onClose()
    }
  }

  if (!isOpen || !project) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
            <p className="text-muted-foreground">{project.category}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onPrev}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onNext}>
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image principale */}
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          {/* Galerie d'images */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {project.images.map((img, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 33vw, 200px"
                />
              </div>
            ))}
          </div>

          {/* Informations du projet */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>
              <p className="text-muted-foreground leading-relaxed">{project.details}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Détails du projet</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Localisation</span>
                  <span className="font-medium text-foreground">{project.location}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Année</span>
                  <span className="font-medium text-foreground">{project.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Surface</span>
                  <span className="font-medium text-foreground">{project.surface}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Catégorie</span>
                  <span className="font-medium text-foreground">{project.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
