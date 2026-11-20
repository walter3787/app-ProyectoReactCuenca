const categorias = [
  "Notebooks",
  "Monitores",
  "Periféricos",
  "Componentes",
  "Audio",
  "Redes",
  "Gaming"
];

const marcas = {
  Notebooks: ["Lenovo", "HP", "ASUS", "Dell", "Apple"],
  Monitores: ["Samsung", "LG", "ASUS", "Gigabyte", "ViewSonic"],
  Periféricos: ["Logitech", "Razer", "Redragon", "Corsair", "HyperX"],
  Componentes: ["Intel Core", "AMD Ryzen", "NVIDIA GeForce", "ASUS", "Kingston Fury"],
  Audio: ["Sony", "JBL", "Sennheiser", "Logitech Astro", "HyperX Cloud"],
  Redes: ["TP-Link", "Cisco", "Ubiquiti", "Tenda", "Mercusys"],
  Gaming: ["Razer Deathadder", "Redragon Kumara", "Corsair Harpoon", "MSI Optix", "ASUS ROG"]
};

export const productosFicticios = Array.from(
  { length: 100 },
  (_, i) => {
    const categoria = categorias[i % categorias.length];
    const listaMarcas = marcas[categoria];
    const marca =
      listaMarcas[Math.floor(Math.random() * listaMarcas.length)];

    const idProducto = i + 101;

    return {
      nombre: `${marca} Modelo Premium ${idProducto}`,
      precio:
        Math.floor(Math.random() * (2200000 - 15000 + 1)) + 15000,
      stock: Math.floor(Math.random() * 45) + 5,
      categoria,
      descripcion: `Excelente producto de la categoría ${categoria} de la marca ${marca}. Ideal para mejorar tu setup con el mejor rendimiento del mercado argentino.`,
      imagen: `https://picsum.photos/seed/prod${idProducto}/400/300`
    };
  }
);

console.log(productosFicticios);