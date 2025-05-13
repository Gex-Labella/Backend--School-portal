import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedEnhancedFacultyData1735040007597 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // First, insert faculties with corrected syntax
        await queryRunner.query(`
            INSERT INTO faculties (id, name, description, "departmentId", icon, departments)
            VALUES
            (
                'computer-science',
                'Computer Science',
                'Pioneering technology and innovation through cutting-edge research and practical applications',
                'software-engineering',
                '/icons/icons8-computer-science-64.svg',
                ARRAY['software-engineering', 'artificial-intelligence']
            ),
            (
                'engineering',
                'Engineering',
                'Transforming ideas into reality through innovative design and practical solutions',
                'Engineer',
                '/icons/icons8-engineering-64.svg',
                ARRAY['mechanical-engineering','electrical-engineering']
            ),
            (
                'hospitality',
                'Hospitality',
                'Master the art of service and tourism',
                'Hotelier',
                '/icons/icons8-hospitality-64.svg',
                ARRAY['tourism-management','culinary-arts']
            ),
            (
                'journalism',
                'Journalism',
                'Shaping narratives and reporting truth',
                'Journalist',
                '/icons/icons8-journalism-64.svg',
                ARRAY['investigative-reporting', 'digital-media']
            ),
            (
                'law',
                'Law',
                'Upholding justice and legal principles',
                'Lawyer',
                '/icons/icons8-law-96.svg',
                ARRAY['corporate-law','human-rights']
            ),
            (
                'agriculture',
                'Agriculture',
                'Advancing sustainable farming practices',
                'Agriculturalist',
                '/icons/icons8-agriculture-96.svg',
                ARRAY['crop-science', 'agricultural-economics']
            )
        `);

        // Insert departments data with corrected syntax
        await queryRunner.query(`
            INSERT INTO departments (id, name, description, "headOfDepartment", "researchFoci", "facultyId")
            VALUES
                (
                    'software-engineering',
                    'Software Engineering',
                    'Designing robust and scalable software solutions',
                    'Dr. Kamau John',
                    ARRAY['Cloud Computing', 'Distributed Systems'],
                    'computer-science'
                ),
                (
                    'artificial-intelligence',
                    'Artificial Intelligence',
                    'Advancing intelligent systems and machine learning',
                    'Dr. Michael Odhiambo',
                    ARRAY['Neural Networks', 'Natural Language Processing'],
                    'computer-science'
                ),
                (
                    'mechanical-engineering',
                    'Mechanical Engineering',
                    'Designing and developing mechanical systems and machines',
                    'Dr. Sarah Wanyama',
                    ARRAY['Robotics', 'Sustainable Design'],
                    'engineering'
                ),
                (
                    'electrical-engineering',
                    'Electrical Engineering',
                    'Advancing electrical systems and power technologies',
                    'Dr. Robert Aukot',
                    ARRAY['Renewable Energy', 'Electronics'],
                    'engineering'
                ),
                (
                    'tourism-management',
                    'Tourism Management',
                    'Exploring global travel and hospitality industries',
                    'Dr. Brenda Wasiku',
                    ARRAY['Sustainable Tourism', 'Hospitality Innovation'],
                    'hospitality'
                ),
                (
                    'culinary-arts',
                    'Culinary Arts',
                    'Crafting culinary excellence and gastronomic experiences',
                    'Chef Fredrick Opela',
                    ARRAY['Culinary Innovation', 'Sustainable Food Systems'],
                    'hospitality'
                ),
                (
                    'digital-media',
                    'Digital Media',
                    'Exploring modern storytelling and multimedia journalism',
                    'Prof. David Mutua',
                    ARRAY['Digital Storytelling', 'Media Innovation'],
                    'journalism'
                ),
                (
                    'investigative-reporting',
                    'Investigative Reporting',
                    'Uncovering truth through in-depth research',
                    'Dr. Fatma Abdi',
                    ARRAY['Investigative Techniques', 'Media Ethics'],
                    'journalism'
                ),
                (
                    'corporate-law',
                    'Corporate Law',
                    'Specializing in business and commercial legal practices',
                    'Prof. Beatrice Kosgei',
                    ARRAY['International Business Law', 'Corporate Governance'],
                    'law'
                ),
                (
                    'human-rights',
                    'Human Rights Law',
                    'Advancing legal protections and social justice',
                    'Dr. Peter Njogu',
                    ARRAY['International Human Rights', 'Social Justice'],
                    'law'
                ),
                (
                    'crop-science',
                    'Crop Science',
                    'Innovative approaches to crop production and food security',
                    'Dr. Peter Mutua',
                    ARRAY['Sustainable Agriculture', 'Crop Genetics'],
                    'agriculture'
                ),
                (
                    'agricultural-economics',
                    'Agricultural Economics',
                    'Analyzing economic aspects of agricultural systems',
                    'Prof. Mary Wanjiru',
                    ARRAY['Agricultural Policy', 'Rural Development'],
                    'agriculture'
                )
        `);

        // Insert programs data with corrected syntax
        await queryRunner.query(`
            INSERT INTO programs (id, name, degree, duration, "researchAreas", "keyHighlights", accreditations, "facultyId")
            VALUES
                (
                    'bsc-software-engineering',
                    'Bachelor of Science in Software Engineering',
                    'Undergraduate',
                    '4 years',
                    ARRAY['Web Technologies', 'Mobile Development'],
                    ARRAY['Industry Internship Program', 'Capstone Project'],
                    ARRAY['ABET Accredited'],
                    'computer-science'
                ),
                (
                    'msc-ai',
                    'Master of Science in Artificial Intelligence',
                    'Postgraduate',
                    '2 years',
                    ARRAY['Machine Learning', 'Computer Vision'],
                    ARRAY['Research Fellowships', 'Industry Partnerships'],
                    ARRAY['ABET Accredited'],
                    'computer-science'
                ),
                (
                    'bsc-mechanical',
                    'Bachelor of Science in Mechanical Engineering',
                    'Undergraduate',
                    '4 years',
                    ARRAY['Automotive Design', 'Aerospace Engineering'],
                    ARRAY['Design Studio', 'Industry Workshops'],
                    ARRAY['Engineering Board of Kenya'],
                    'engineering'
                ),
                (
                    'msc-electrical',
                    'Master of Science in Electrical Engineering',
                    'Postgraduate',
                    '2 years',
                    ARRAY['Smart Grid', 'Embedded Systems'],
                    ARRAY['Research Innovation Grant', 'International Collaborations'],
                    ARRAY['Engineering Board of Kenya'],
                    'engineering'
                ),
                (
                    'bsc-hospitality',
                    'Bachelor of Science in Hospitality Management',
                    'Undergraduate',
                    '4 years',
                    ARRAY['Event Management', 'Hotel Administration'],
                    ARRAY['Industry Internships', 'Global Exchange Programs'],
                    ARRAY['World Tourism Organization Certified'],
                    'hospitality'
                ),
                (
                    'msc-culinary',
                    'Master of Science in Culinary Innovation',
                    'Postgraduate',
                    '2 years',
                    ARRAY['Gastronomy', 'Food Technology'],
                    ARRAY['Professional Kitchen Training', 'Culinary Research'],
                    ARRAY['ABET Accredited'],
                    'hospitality'
                ),
                (
                    'ba-journalism',
                    'Bachelor of Arts in Journalism',
                    'Undergraduate',
                    '4 years',
                    ARRAY['Broadcast Journalism', 'Digital Reporting'],
                    ARRAY['Media Lab', 'Internship Programs'],
                    ARRAY['National Media Council Approved'],
                    'journalism'
                ),
                (
                    'msc-media-studies',
                    'Master of Science in Media Studies',
                    'Postgraduate',
                    '2 years',
                    ARRAY['Media Policy', 'Global Communication'],
                    ARRAY['Research Fellowships', 'International Conferences'],
                    ARRAY['National Media Council Approved'],
                    'journalism'
                ),
                (
                    'llb-law',
                    'Bachelor of Laws',
                    'Undergraduate',
                    '4 years',
                    ARRAY['Constitutional Law', 'Criminal Justice'],
                    ARRAY['Moot Court Competitions', 'Legal Clinics'],
                    ARRAY['Bar Association Approved'],
                    'law'
                ),
                (
                    'llm-corporate',
                    'Master of Laws in Corporate Law',
                    'Postgraduate',
                    '2 years',
                    ARRAY['International Arbitration', 'Intellectual Property'],
                    ARRAY['Industry Partnerships', 'Research Seminars'],
                    ARRAY['Bar Association Approved'],
                    'law'
                ),
                (
                    'bsc-agriculture',
                    'Bachelor of Science in Agricultural Science',
                    'Undergraduate',
                    '4 years',
                    ARRAY['Crop Improvement', 'Sustainable Farming'],
                    ARRAY['Experimental Farm', 'Research Internships'],
                    ARRAY['Agricultural Research Council Approved'],
                    'agriculture'
                ),
                (
                    'msc-agribusiness',
                    'Master of Science in Agribusiness Management',
                    'Postgraduate',
                    '2 years',
                    ARRAY['Agricultural Innovation', 'Food Systems'],
                    ARRAY['Industry Collaborations', 'Global Agriculture Seminars'],
                    ARRAY['Agricultural Research Council Approved'],
                    'agriculture'
                )
        `);

        // Insert career paths data with corrected syntax
        await queryRunner.query(`
            INSERT INTO career_paths (title, description, "potentialEmployers", "averageSalaryRange", "requiredSkills", "facultyId")
            VALUES
                (
                    'Software Developer',
                    'Create innovative software solutions across various industries',
                    ARRAY['Tech Giants', 'Startups', 'Financial Institutions'],
                    '$70,000 - $120,000',
                    ARRAY['Programming', 'Problem-Solving', 'Collaboration'],
                    'computer-science'
                ),
                (
                    'AI Research Scientist',
                    'Develop advanced algorithms and push the boundaries of artificial intelligence',
                    ARRAY['Research Labs', 'Tech Companies', 'Universities'],
                    '$90,000 - $150,000',
                    ARRAY['Machine Learning', 'Statistical Analysis', 'Research'],
                    'computer-science'
                ),
                (
                    'Robotics Engineer',
                    'Design and develop advanced robotic systems',
                    ARRAY['Manufacturing', 'Aerospace', 'Healthcare'],
                    '$75,000 - $130,000',
                    ARRAY['Mechanical Design', 'Programming', 'Problem-Solving'],
                    'engineering'
                ),
                (
                    'Renewable Energy Specialist',
                    'Create sustainable energy solutions for a greener future',
                    ARRAY['Energy Companies', 'Government Agencies', 'Consulting Firms'],
                    '$80,000 - $140,000',
                    ARRAY['Energy Systems', 'Environmental Analysis', 'Project Management'],
                    'engineering'
                ),
                (
                    'Hotel Manager',
                    'Lead and manage hospitality operations',
                    ARRAY['Luxury Hotels', 'Resort Chains', 'Cruise Lines'],
                    '$55,000 - $95,000',
                    ARRAY['Leadership', 'Customer Service', 'Business Management'],
                    'hospitality'
                ),
                (
                    'Executive Chef',
                    'Create innovative culinary experiences',
                    ARRAY['Fine Dining Restaurants', 'Catering Companies', 'Resort Kitchens'],
                    '$60,000 - $120,000',
                    ARRAY['Culinary Expertise', 'Menu Planning', 'Kitchen Management'],
                    'hospitality'
                ),
                (
                    'Multimedia Journalist',
                    'Report news across various media platforms',
                    ARRAY['News Networks', 'Online Media', 'Print Publications'],
                    '$45,000 - $85,000',
                    ARRAY['Storytelling', 'Digital Reporting', 'Research'],
                    'journalism'
                ),
                (
                    'Media Strategist',
                    'Develop communication strategies for organizations',
                    ARRAY['PR Firms', 'Corporate Communications', 'Government Agencies'],
                    '$60,000 - $100,000',
                    ARRAY['Communication', 'Strategic Planning', 'Digital Marketing'],
                    'journalism'
                ),
                (
                    'Corporate Lawyer',
                    'Provide legal counsel to businesses and organizations',
                    ARRAY['Law Firms', 'Multinational Corporations', 'Startups'],
                    '$70,000 - $150,000',
                    ARRAY['Legal Analysis', 'Negotiation', 'Business Acumen'],
                    'law'
                ),
                (
                    'Human Rights Advocate',
                    'Champion legal rights and social justice',
                    ARRAY['NGOs', 'International Organizations', 'Government Agencies'],
                    '$55,000 - $100,000',
                    ARRAY['Advocacy', 'Research', 'Policy Development'],
                    'law'
                ),
                (
                    'Agricultural Scientist',
                    'Develop innovative solutions for farming and food production',
                    ARRAY['Research Institutes', 'Agricultural Companies', 'Government Agencies'],
                    '$55,000 - $95,000',
                    ARRAY['Scientific Research', 'Crop Management', 'Data Analysis'],
                    'agriculture'
                ),
                (
                    'Agribusiness Consultant',
                    'Provide strategic advice to agricultural enterprises',
                    ARRAY['Farming Corporations', 'Agricultural Startups', 'International Organizations'],
                    '$60,000 - $110,000',
                    ARRAY['Business Strategy', 'Agricultural Knowledge', 'Market Analysis'],
                    'agriculture'
                )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove all data in reverse order
        await queryRunner.query(`DELETE FROM career_paths`);
        await queryRunner.query(`DELETE FROM programs`);
        await queryRunner.query(`DELETE FROM departments`);
        await queryRunner.query(`DELETE FROM faculties`);
    }
}