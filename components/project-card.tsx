"use client"

import { motion } from "framer-motion"
import type { Project } from "@/types/project"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      onClick={onClick}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden bg-card rounded-lg border shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 transition-colors duration-300 leading-tight" style={{ color: '#1e51a2' }}>
            {project.title}
          </h3>
          <p className="text-gray-600 text-base line-clamp-2 leading-relaxed font-light">{project.description}</p>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              {project.details.annee}
            </span>
            <motion.div
              className="w-6 h-6 rounded-full border border-muted-foreground flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <svg
                className="w-3 h-3 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
