"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Project } from "@/types/project"
import { ProjectCard } from "./project-card"

interface ProjectGridProps {
  projects: Project[]
  onProjectClick: (project: Project) => void
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-sans" layout>
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ProjectCard project={project} onClick={() => onProjectClick(project)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
