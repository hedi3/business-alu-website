"use client"

import { useState } from "react"
import { ProjectGrid } from "@/components/project-grid"
import { ProjectModal } from "@/components/project-modal"
import { FilterTabs } from "@/components/filter-tabs"
import type { Project } from "@/types/project"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
// Sample project data - using actual available images
const projects: Project[] = [
  {
    id: 1,
    title: "Villa Moderne - Façade Aluminium",
    category: "facades",
    image: "/images/image00002.jpeg",
    images: [
      "/images/image00002.jpeg",
      "/images/image00018.jpeg",
      "/images/image00019.jpeg",
    ],
    description:
      "Réalisation d&apos;une façade moderne en aluminium pour une villa contemporaine. Système de bardage ventilé avec finition anodisée naturelle.",
    details: {
      client: "Architecte Privé",
      surface: "180 m²",
      annee: "2024",
      materiau: "Aluminium anodisé naturel",
    },
  },
  {
    id: 2,
    title: "Résidence Lumière - Baies Vitrées",
    category: "windows",
    image: "/images/aluminum-window-detail.jpg",
    images: [
      "/images/aluminum-window-detail.jpg",
      "/images/panoramic-view-window.jpg",
      "/images/modern-window-frame.jpg",
    ],
    description:
      "Installation de grandes baies vitrées en aluminium pour une résidence haut de gamme. Menuiseries à rupture de pont thermique.",
    details: {
      client: "Promoteur Immobilier",
      surface: "45 fenêtres",
      annee: "2024",
      materiau: "Aluminium thermolaqué RAL 7016",
    },
  },
  {
    id: 3,
    title: "Immeuble Tertiaire - Mur Rideau",
    category: "facades",
    image: "/images/curtain-wall-facade.jpg",
    images: [
      "/images/curtain-wall-facade.jpg",
      "/images/commercial-building-glass-facade-aluminum.jpg",
      "/images/aluminum-facade-detail.jpg",
    ],
    description:
      "Conception et pose d&apos;un mur rideau en aluminium pour un immeuble de bureaux. Structure modulaire avec vitrage haute performance.",
    details: {
      client: "Entreprise de Construction",
      surface: "1200 m²",
      annee: "2023",
      materiau: "Aluminium structurel + vitrage isolant",
    },
  },
  {
    id: 4,
    title: "Maison Contemporaine - Portes Coulissantes",
    category: "doors",
    image: "/images/glass-sliding-door.jpg",
    images: [
      "/images/glass-sliding-door.jpg",
      "/images/sliding-glass-door-office.jpg",
      "/images/aluminum-frame-detail.jpg",
    ],
    description:
      "Portes coulissantes en aluminium grand format pour une maison contemporaine. Système de coulissement invisible intégré.",
    details: {
      client: "Particulier",
      surface: "3 portes de 4m",
      annee: "2024",
      materiau: "Aluminium thermolaqué anthracite",
    },
  },
  {
    id: 5,
    title: "Hôtel Boutique - Pergola Bioclimatique",
    category: "pergolas",
    image: "/images/image00024.jpeg",
    images: [
      "/images/image00024.jpeg",
      "/images/image00025.jpeg",
      "/images/modern-commercial-building.png",
    ],
    description:
      "Pergola bioclimatique en aluminium pour la terrasse d&apos;un hôtel boutique. Lames orientables motorisées avec éclairage LED intégré.",
    details: {
      client: "Hôtelier",
      surface: "80 m²",
      annee: "2023",
      materiau: "Aluminium thermolaqué blanc + motorisation",
    },
  },
  {
    id: 6,
    title: "Bureau Design - Cloisons Vitrées",
    category: "partitions",
    image: "/images/cloison.jpg",
    images: [
      "/images/cloison.jpg",
      "/images/interior-glass-partition-office-aluminum.jpg",
      "/images/office-glass-partition.jpg",
    ],
    description:
      "Cloisons vitrées en aluminium pour des bureaux modernes. Système modulaire avec vitrage acoustique et films décoratifs.",
    details: {
      client: "Entreprise Tech",
      surface: "150 m linéaires",
      annee: "2024",
      materiau: "Aluminium anodisé + vitrage acoustique",
    },
  },
]

const categories = [
  { id: "all", label: "Tous les projets" },
  { id: "facades", label: "Façades" },
  { id: "windows", label: "Fenêtres" },
  { id: "doors", label: "Portes" },
  { id: "pergolas", label: "Pergolas" },
  { id: "partitions", label: "Cloisons" },
]

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
   

    <div className="min-h-screen bg-background font-sans">
      {/* Header Section */} <Header />
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-balance leading-tight tracking-tight" style={{ color: '#1e51a2' }}>
            Nos Réalisations
          </h1>
          <p className="text-2xl font-light text-gray-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            Découvrez nos projets d&apos;excellence en solutions architecturales aluminium. Chaque réalisation témoigne de
            notre savoir-faire et de notre engagement qualité.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <FilterTabs categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <ProjectGrid projects={filteredProjects} onProjectClick={setSelectedProject} />
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      <Footer />

    </div>
  )
}
