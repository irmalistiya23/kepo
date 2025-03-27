import cron from 'node-cron';
import prisma from '../utils/prisma.client.js';

// Cron job jalan tiap 1 menit buat hapus OTP yang expired
cron.schedule('* * * * *', async () => {
  const now = Date.now();
  await prisma.oTP.deleteMany({
    where: { time: { lt: now } } // Hapus OTP yang waktunya kurang dari sekarang
  });
  console.log("OTP expired dihapus.");
});
