"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Project } from "@/types/project"
import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-6xl max-h-[90vh] bg-background rounded-lg overflow-hidden shadow-2xl border"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200 border shadow-sm"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          <div className="grid md:grid-cols-2 h-full">
            {/* Image Gallery */}
            <div className="relative bg-muted">
              <div className="aspect-[4/3] md:aspect-auto md:h-full relative">
                <Image
                  src={project.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />

                {/* Navigation Arrows */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200 border shadow-sm"
                    >
                      <ChevronLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200 border shadow-sm"
                    >
                      <ChevronRight className="w-5 h-5 text-foreground" />
                    </button>
                  </>
                )}
              </div>

              {/* Image Indicators */}
              {project.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentImageIndex ? "bg-foreground" : "bg-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="p-8 overflow-y-auto">
              <h2 className="text-4xl font-bold mb-6 leading-tight" style={{ color: '#1e51a2' }}>{project.title}</h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed font-light">{project.description}</p>

              {/* Project Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 tracking-wide" style={{ color: '#1e51a2' }}>
                    Détails du Projet
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-muted-foreground">Client</dt>
                      <dd className="text-foreground font-medium mt-1">{project.details.client}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Année</dt>
                      <dd className="text-foreground font-medium mt-1">{project.details.annee}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Surface</dt>
                      <dd className="text-foreground font-medium mt-1">{project.details.surface}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Matériau</dt>
                      <dd className="text-foreground font-medium mt-1">{project.details.materiau}</dd>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">Intéressé par un projet similaire ?</p>
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
                  <Link href="/contact" >
          Demander un Devis
        </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
