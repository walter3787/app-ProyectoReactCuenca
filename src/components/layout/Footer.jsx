import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    fetch('/data/nosotros.json')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar datos del equipo');
        return res.json();
      })
      .then((data) => setEquipo(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Sección: Tarjetas de las 3 personas del equipo */}
        <section className={styles.teamSection}>
          <h3 className={styles.teamTitle}>Nuestro Equipo</h3>
          <p className={styles.teamSubtitle}>Conocé a los profesionales detrás del proyecto</p>
          <div className={styles.teamGrid}>
            {equipo.map((persona) => (
              <div key={persona.id} className={styles.memberCard}>
                <img
                  src={persona.foto}
                  alt={persona.nombre}
                  className={styles.memberImg}
                />
                <h4 className={styles.memberName}>{persona.nombre}</h4>
                <p className={styles.memberRole}>{persona.rol}</p>
                <p className={styles.memberEmail}>{persona.email}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección: Información institucional de la empresa */}
        <section className={styles.infoSection}>
          <div className={styles.infoCol}>
            <h4>SMDStore</h4>
            <p>
              Plataforma de comercio electrónico orientada a ofrecer componentes y
              tecnología de alta calidad con soporte especializado.
            </p>
          </div>

          <div className={styles.infoCol}>
            <h4>Sedes y Contacto</h4>
            <p>📍 Av. Corrientes 1234, CABA</p>
            <p>📞 +54 (11) 4567-8900</p>
            <p>✉️ contacto@smdstore.com</p>
          </div>

          <div className={styles.infoCol}>
            <h4>Políticas y Legal</h4>
            <ul>
              <li>Políticas de Privacidad</li>
              <li>Términos del Servicio</li>
              <li>Defensa de las y los Consumidores</li>
              <li>Garantía de compra protegida</li>
            </ul>
          </div>
        </section>

        {/* Fila final: Copyright y propiedad intelectual */}
        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} SMDStore. Todos los derechos reservados. Propiedad intelectual registrada.</p>
        </div>
      </div>
    </footer>
  );
}