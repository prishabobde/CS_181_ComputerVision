const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const hrPassword = await bcrypt.hash('hr@prisma123', 10);
  const hr = await prisma.user.upsert({
    where: { email: 'hr@prismacompany.com' },
    update: {},
    create: {
      email: 'hr@prismacompany.com',
      password: hrPassword,
      name: 'Sarah Mitchell',
      role: 'HR',
    },
  });
  console.log('Created HR user:', hr.email);

  const appPassword = await bcrypt.hash('applicant@123', 10);
  const applicant = await prisma.user.upsert({
    where: { email: 'john.doe@email.com' },
    update: {},
    create: {
      email: 'john.doe@email.com',
      password: appPassword,
      name: 'John Doe',
      role: 'APPLICANT',
    },
  });
  console.log('Created Applicant user:', applicant.email);

  const jobsData = [
    {
      title: 'Senior Software Engineer',
      description: 'We are looking for an experienced software engineer to join our core platform team. You will design, build and maintain high-performance APIs and services.\n\nRequirements:\n- 5+ years of experience in backend development\n- Proficiency in Node.js, Python or Go\n- Experience with PostgreSQL and Redis\n- Strong understanding of distributed systems',
      department: 'Engineering',
      location: 'San Francisco, CA (Hybrid)',
      salaryRange: '$150,000 - $200,000',
    },
    {
      title: 'Product Manager',
      description: 'Join Prisma Company as a Product Manager to drive the vision and execution of our flagship products. You will work closely with engineering, design, and customers.\n\nRequirements:\n- 3+ years of PM experience at a tech company\n- Strong analytical and communication skills\n- Experience with agile development methodologies\n- Data-driven mindset',
      department: 'Product',
      location: 'New York, NY (On-site)',
      salaryRange: '$120,000 - $160,000',
    },
    {
      title: 'UX/UI Designer',
      description: 'We are seeking a talented UX/UI Designer to create exceptional user experiences across our product suite.\n\nRequirements:\n- Portfolio demonstrating strong UX and visual design skills\n- Proficiency in Figma\n- Experience with user research and usability testing\n- 3+ years of product design experience',
      department: 'Design',
      location: 'Remote',
      salaryRange: '$100,000 - $140,000',
    },
    {
      title: 'Data Analyst',
      description: 'Help Prisma Company make data-driven decisions by analyzing complex datasets and presenting actionable insights.\n\nRequirements:\n- Experience with SQL, Python or R\n- Proficiency in Tableau or similar BI tools\n- Strong statistical knowledge\n- Excellent communication skills',
      department: 'Data',
      location: 'Austin, TX (Hybrid)',
      salaryRange: '$90,000 - $120,000',
    },
    {
      title: 'Marketing Manager',
      description: 'Lead and execute marketing campaigns to drive brand awareness and customer acquisition for Prisma Company.\n\nRequirements:\n- 4+ years of marketing experience\n- Experience with digital marketing and SEO\n- Strong content creation skills\n- Familiarity with marketing analytics tools',
      department: 'Marketing',
      location: 'Chicago, IL (On-site)',
      salaryRange: '$85,000 - $115,000',
    },
  ];

  // Only create jobs if none exist
  const existingCount = await prisma.jobPosting.count();
  if (existingCount === 0) {
    for (const jobData of jobsData) {
      const job = await prisma.jobPosting.create({ data: jobData });
      console.log('Created job:', job.title);
    }
  } else {
    console.log(`Skipping job seed — ${existingCount} job(s) already exist`);
  }

  console.log('\nSeed complete!');
  console.log('\nDemo credentials:');
  console.log('  HR:        hr@prismacompany.com  / hr@prisma123');
  console.log('  Applicant: john.doe@email.com    / applicant@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
