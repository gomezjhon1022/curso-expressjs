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
  await prisma.user.deleteMany();
}

main()
  .catch(e=>{
    console.error(e);
    process.exit(1);
  })
  .finally(async ()=> {
    await prisma.$disconnect();
  });