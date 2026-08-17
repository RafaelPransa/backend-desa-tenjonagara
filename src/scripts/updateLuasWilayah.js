const { ProfilDesa } = require('../models');

async function main() {
  try {
    let p = await ProfilDesa.findOne();
    const newLuas = '490 Hektar';

    if (p) {
      await p.update({ luas_wilayah: newLuas });
      console.log('Successfully updated luas_wilayah in MySQL database!');
    } else {
      await ProfilDesa.create({ luas_wilayah: newLuas });
      console.log('Created new profil record with updated luas_wilayah!');
    }
  } catch (e) {
    console.error('Error updating luas_wilayah:', e);
  } finally {
    process.exit(0);
  }
}

main();
