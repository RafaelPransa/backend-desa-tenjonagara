const { PotensiDesa } = require('../models');

async function main() {
  try {
    const deletedCount = await PotensiDesa.destroy({
      where: { kategori: 'wisata' }
    });
    console.log(`Successfully deleted ${deletedCount} wisata potensi rows from MySQL database!`);
  } catch (e) {
    console.error('Error cleaning wisata potensi:', e);
  } finally {
    process.exit(0);
  }
}

main();
