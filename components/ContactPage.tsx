"use client";
import React, { useState, useRef } from 'react';
import styles from './ContactPage.module.scss';
import { Phone, Mail, MapPin, Facebook, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Envoi en cours...');

    if (form.current) {
      emailjs.sendForm(
        'service_0q75lmb',
        'template_lzuobhd',
        form.current,
        'MWlN-gKeDamSAyTAx' 
      )
      .then((result) => {
          console.log(result.text);
          setStatus('Merci ! Votre message a été envoyé avec succès.');
          form.current?.reset(); // Vide le formulaire
      }, (error) => {
          console.log(error.text);
          setStatus('Une erreur est survenue. Veuillez réessayer.');
      });
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.header}>
        <h1>Un projet en tête ? Contactez-nous.</h1>
        <p>Remplissez le formulaire ou utilisez nos coordonnées ci-dessous. Notre équipe est prête à vous aider.</p>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.formSection}>
          <form ref={form} onSubmit={sendEmail}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nom complet</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Adresse e-mail</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Numéro de téléphone</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message">Votre message</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>Envoyer le Message</button>
            {status && <p className={styles.statusMessage}>{status}</p>}
          </form>
        </div>

        <div className={styles.infoSection}>
          <h2>Nos Coordonnées</h2>
          <ul>
            <li><MapPin size={20} /><span>Rue Al-Moez Lidin Allah, Jardins Al Menzah, MNIHLA, Tunisie</span></li>
            <li><Phone size={20} /><a href="tel:+21697112000">97 112 000</a></li>
            <li><Mail size={20} /><a href="mailto:businessalu@yahoo.com">businessalu@yahoo.com</a></li>
            <li><Clock size={20} /><span>Lundi - Samedi : 8h00 - 18h00</span></li>
            <li><Facebook size={20} /><a href="https://www.facebook.com/people/Business-Alu/100063670103511/?locale=fr_FR" target="_blank" rel="noopener noreferrer">Suivez-nous sur Facebook</a></li>
          </ul>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.937666299443!2d10.13027181529141!3d36.84647349993356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd33b21077508f%3A0xaeafa34f412cd020!2sMnihla!5e0!3m2!1sfr!2stn"
              width="100%" height="100%" style={{ border: 0 }}
              allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

