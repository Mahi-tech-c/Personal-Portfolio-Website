// Development startup - seeds data and starts server
// No MongoDB required - uses NeDB file-based database

const path = require('path');

// Set environment variables
process.env.PORT = process.env.PORT || 5000;
process.env.NODE_ENV = 'development';
process.env.JWT_SECRET = 'dev_secret_key_2024';
process.env.JWT_EXPIRE = '7d';
process.env.CLIENT_URL = `http://localhost:${process.env.PORT}`;
process.env.ADMIN_EMAIL = 'admin@portfolio.com';
process.env.ADMIN_PASSWORD = 'Admin@123456';

const { User, Profile, Project, Skill, Certificate, Achievement } = require('./db/adapter');

async function seedDatabase() {
    console.log('🔧 Seeding database...');

    // Check if already seeded
    const existingUsers = await User.find();
    if (existingUsers.length > 0) {
        console.log('📦 Database already seeded, skipping...');
        return;
    }

    // Create admin user
    await User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin'
    });
    console.log('✅ Admin user created');

    // Create profile
    await Profile.create({
        name: 'Salma Tabassum',
        title: 'Computer Science Engineering Student',
        bio: 'I am a dedicated Computer Science and Networks student at Kakatiya Institute of Technology & Science with a strong foundation in programming and web development. Passionate about building innovative solutions and constantly learning new technologies.',
        email: 'salma3962024@gmail.com',
        phone: '+91 XXXXXXXXXX',
        location: 'Warangal, Telangana, India',
        birthday: 'June 15, 2005',
        profileImage: 'https://ui-avatars.com/api/?name=Salma+Tabassum&size=400&background=6366f1&color=fff&bold=true',
        socialLinks: {
            github: 'https://github.com/Mahi-tech-c',
            linkedin: 'https://www.linkedin.com/in/salma-tabassum-31b165320'
        },
        education: [
            {
                degree: 'B.Tech in Computer Science and Networks',
                institution: 'Kakatiya Institute of Technology & Science',
                year: '2022 - 2026',
                description: 'Currently pursuing B.Tech with a focus on Computer Science and Networks.',
                cgpa: '8.97'
            },
            {
                degree: 'Intermediate (MPC)',
                institution: 'Telangana State Board',
                year: '2020 - 2022',
                description: 'Completed intermediate with Mathematics, Physics, and Chemistry.',
                cgpa: '9.5'
            }
        ],
        experience: [],
        typingTitles: ['Computer Science Student', 'Web Developer', 'Problem Solver', 'Tech Enthusiast']
    });
    console.log('✅ Profile created');

    // Create projects
    await Project.insertMany([
        {
            title: 'Personal Portfolio Website',
            description: 'A modern, responsive full-stack portfolio website built with Node.js, Express, MongoDB, and vanilla JavaScript. Features include admin dashboard, contact form with email notifications, and dynamic content management.',
            shortDescription: 'Full-stack portfolio with admin dashboard',
            category: 'Web Development',
            technologies: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
            githubUrl: 'https://github.com/Mahi-tech-c/Personal-Portfolio-Website',
            featured: true,
            status: 'completed'
        },
        {
            title: 'E-Commerce Platform',
            description: 'A feature-rich e-commerce platform with product listings, shopping cart, user authentication, and payment integration.',
            shortDescription: 'Full-featured online shopping platform',
            category: 'Web Development',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            featured: true,
            status: 'completed'
        },
        {
            title: 'Weather Dashboard',
            description: 'A beautiful weather dashboard that displays current weather conditions and forecasts using real-time API data.',
            shortDescription: 'Real-time weather information dashboard',
            category: 'Web Development',
            technologies: ['JavaScript', 'API', 'HTML', 'CSS'],
            featured: false,
            status: 'completed'
        },
        {
            title: 'Task Management System',
            description: 'A desktop application for managing tasks and projects with features like drag-and-drop, priority setting, and deadline tracking.',
            shortDescription: 'Desktop task management application',
            category: 'Desktop App',
            technologies: ['Java', 'JavaFX', 'SQLite'],
            featured: false,
            status: 'completed'
        },
        {
            title: 'IoT Home Automation',
            description: 'An IoT-based home automation system that allows users to control home appliances remotely using a web interface and Arduino.',
            shortDescription: 'Smart home control system',
            category: 'IoT',
            technologies: ['Arduino', 'C++', 'Node.js', 'MQTT'],
            featured: false,
            status: 'completed'
        }
    ]);
    console.log('✅ Projects created');

    // Create skills
    await Skill.insertMany([
        { name: 'C', category: 'Programming Languages', proficiency: 85 },
        { name: 'C++', category: 'Programming Languages', proficiency: 80 },
        { name: 'Java', category: 'Programming Languages', proficiency: 75 },
        { name: 'Python', category: 'Programming Languages', proficiency: 70 },
        { name: 'JavaScript', category: 'Programming Languages', proficiency: 85 },
        { name: 'HTML5', category: 'Web Development', proficiency: 95 },
        { name: 'CSS3', category: 'Web Development', proficiency: 90 },
        { name: 'Node.js', category: 'Web Development', proficiency: 80 },
        { name: 'Express.js', category: 'Web Development', proficiency: 80 },
        { name: 'React', category: 'Web Development', proficiency: 70 },
        { name: 'MongoDB', category: 'Database', proficiency: 75 },
        { name: 'MySQL', category: 'Database', proficiency: 70 },
        { name: 'Git', category: 'Tools & Technologies', proficiency: 85 },
        { name: 'Docker', category: 'Tools & Technologies', proficiency: 60 },
        { name: 'VS Code', category: 'Tools & Technologies', proficiency: 90 },
        { name: 'Problem Solving', category: 'Soft Skills', proficiency: 90 },
        { name: 'Team Collaboration', category: 'Soft Skills', proficiency: 85 },
        { name: 'Communication', category: 'Soft Skills', proficiency: 80 }
    ]);
    console.log('✅ Skills created');

    // Create certificates
    await Certificate.insertMany([
        {
            title: 'Web Development Bootcamp',
            issuer: 'Udemy',
            date: '2024',
            description: 'Comprehensive web development course covering HTML, CSS, JavaScript, Node.js, and more.',
            credentialUrl: ''
        },
        {
            title: 'JavaScript Algorithms and Data Structures',
            issuer: 'freeCodeCamp',
            date: '2024',
            description: 'Completed 300+ hours of JavaScript programming challenges and projects.',
            credentialUrl: ''
        },
        {
            title: 'Introduction to IoT',
            issuer: 'NPTEL',
            date: '2023',
            description: 'Foundation course on Internet of Things concepts and applications.',
            credentialUrl: ''
        }
    ]);
    console.log('✅ Certificates created');

    // Create achievements
    await Achievement.insertMany([
        {
            title: 'Hackathon Winner',
            description: 'Won first place at a regional hackathon for building an innovative web application.',
            date: '2024',
            icon: 'trophy'
        },
        {
            title: 'Academic Excellence',
            description: 'Maintained a CGPA of 8.97 throughout the B.Tech program.',
            date: '2022-2026',
            icon: 'star'
        },
        {
            title: 'Open Source Contributor',
            description: 'Active contributor to open-source projects on GitHub.',
            date: '2023-Present',
            icon: 'code'
        }
    ]);
    console.log('✅ Achievements created');

    console.log('\n🎉 DATABASE SEEDED SUCCESSFULLY!\n');
    console.log('Admin Credentials:');
    console.log(`  Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`  Password: ${process.env.ADMIN_PASSWORD}\n`);
}

async function start() {
    try {
        await seedDatabase();

        const app = require('./app');

        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
            console.log(`📡 API: http://localhost:${process.env.PORT}/api`);
            console.log(`🌐 Portfolio: http://localhost:${process.env.PORT}`);
            console.log(`\nPress Ctrl+C to stop\n`);
        });
    } catch (err) {
        console.error('❌ Failed to start:', err);
        process.exit(1);
    }
}

start();
