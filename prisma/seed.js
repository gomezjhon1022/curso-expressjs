const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main(){
  // const demoUsers= [
  //   {name:"Diana Salgado", email: "dsalgado@gmail.com", },
  //   {name:"Natalia Reyes", email: "nataliar@gmail.com", },
  //   {name:"Samantha Lee", email: "samanthalee@gmail.com", },
  // ];
  // for (const user of demoUsers) {
  //   await prisma.user.create({
  //     data: user
  //   });
  // }
  // console.log('Users have been successfully created')
  // await prisma.user.deleteMany();
  
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password123',
      name: 'User One',
      role: 'USER'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'ADMIN'
    }
  });

  // Create block times
  const timeBlock1 = await prisma.timeBlock.create({
    data: {
      startTime: new Date('2023-10-01T09:00:00Z'),
      endTime: new Date('2023-10-01T10:00:00Z')
    }
  });

  const timeBlock2 = await prisma.timeBlock.create({
    data: {
      startTime: new Date('2023-10-01T10:00:00Z'),
      endTime: new Date('2023-10-01T11:00:00Z')
    }
  });

  // Create appointments
  await prisma.appointment.create({
    data: {
      date: new Date('2023-10-01T09:00:00Z'),
      user: { connect: { id: user1.id } },
      timeBlock: { connect: { id: timeBlock1.id } }
    }
  });

  await prisma.appointment.create({
    data: {
      date: new Date('2023-10-01T10:00:00Z'),
      user: { connect: { id: user2.id } },
      timeBlock: { connect: { id: timeBlock2.id } }
    }
  });
}

main()
  .catch(e=>{
    console.error(e);
    process.exit(1);
  })
  .finally(async ()=> {
    await prisma.$disconnect();
  });