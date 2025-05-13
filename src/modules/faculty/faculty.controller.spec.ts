import { Test, TestingModule } from '@nestjs/testing';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';

// Updated mock data to match the actual response structure
const mockFaculties = [
  {
    id: "computer-science",
    name: "Computer Science",
    description: "Pioneering technology and innovation through cutting-edge research and practical applications",
    icon: "/icons/icons8-computer-science-64.svg",
    departmentId: "software-engineering",
    departments: ["software-engineering", "artificial-intelligence"]
  },
  {
    id: "engineering",
    name: "Engineering",
    description: "Transforming ideas into reality through innovative design and practical solutions",
    icon: "/icons/icons8-engineering-64.svg",
    departmentId: "mechanical-engineering",
    departments: ["mechanical-engineering", "electrical-engineering"]
  },
  {
    id: "electrical-engineering",
    name: "Electrical Engineering",
    description:
      "Advancing electrical systems and power technologies",
    headOfDepartment: "Dr. Robert Aukot",
    researchFoci: ["Renewable Energy", "Electronics"],
  },
  {
  id: "tourism-management",
  name: "Tourism Management",
  description: "Exploring global travel and hospitality industries",
  headOfDepartment: "Dr. Brenda Wasiku",
  researchFoci: ["Sustainable Tourism", "Hospitality Innovation"],
  },
  {
  id: "culinary-arts",
  name: "Culinary Arts",
  description: "Crafting culinary excellence and gastronomic experiences",
  headOfDepartment: "Chef Fredrick Opela",
  researchFoci: ["Culinary Innovation", "Sustainable Food Systems"],
  },
  {
  id: "corporate-law",
  name: "Corporate Law",
  description: "Specializing in business and commercial legal practices",
  headOfDepartment: "Prof. Beatrice Kosgei",
  researchFoci: ["International Business Law", "Corporate Governance"],
  },
  {
  id: "human-rights",
  name: "Human Rights Law",
  description: "Advancing legal protections and social justice",
  headOfDepartment: "Dr. Peter Njogu",
  researchFoci: ["International Human Rights", "Social Justice"],
  },
  {
  id: "crop-science",
  name: "Crop Science",
  description: "Innovative approaches to crop production and food security",
  headOfDepartment: "Dr. Peter Mutua",
  researchFoci: ["Sustainable Agriculture", "Crop Genetics"],
  },
  {
  id: "agricultural-economics",
  name: "Agricultural Economics",
  description: "Analyzing economic aspects of agricultural systems",
  headOfDepartment: "Prof. Mary Wanjiru",
  researchFoci: ["Agricultural Policy", "Rural Development"],
  }
];

// Create a mock service with proper implementation
const mockFacultyService = {
  findAll: jest.fn().mockReturnValue(mockFaculties),
  findOne: jest.fn().mockImplementation((id) => 
    mockFaculties.find(faculty => faculty.id === id)
  ),
  create: jest.fn().mockImplementation((faculty) => ({
    ...faculty,
    id: faculty.id || `faculty-${Math.floor(Math.random() * 1000)}`
  })),
  update: jest.fn().mockImplementation((id, updateFaculty) => ({
    ...mockFaculties.find(faculty => faculty.id === id),
    ...updateFaculty
  })),
  remove: jest.fn().mockImplementation((id) => 
    mockFaculties.find(faculty => faculty.id === id)
  )
};

describe('FacultyController', () => {
  let controller: FacultyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacultyController],
      providers: [
        {
          provide: FacultyService,
          useValue: mockFacultyService
        }
      ]
    }).compile();

    controller = module.get<FacultyController>(FacultyController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of faculties', () => {
      const result = controller.findAll();
      expect(result).toEqual(mockFaculties);
      expect(mockFacultyService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a specific faculty by id', () => {
      const facultyId = 'computer-science';
      mockFacultyService.findOne.mockReturnValueOnce(mockFaculties[0]);
      
      const result = controller.findOne(facultyId);
      
      expect(result).toBeDefined();
      expect(result.id).toBe(facultyId);
      expect(result.name).toBe('Computer Science');
      expect(mockFacultyService.findOne).toHaveBeenCalledWith(facultyId);
    });

    it('should return undefined for non-existent faculty', () => {
      mockFacultyService.findOne.mockReturnValueOnce(undefined);
      const result = controller.findOne('non-existent-id');
      expect(result).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create a new faculty', () => {
      const newFaculty = {
        id: 'new-faculty',
        name: 'New Faculty',
        description: 'A brand new faculty',
        departmentId: 'new-department',
        icon: '/icons/new-faculty.svg',
        departments: ['new-department']
      };

      mockFacultyService.create.mockReturnValueOnce(newFaculty);
      const result = controller.create(newFaculty);
    
      expect(result).toBeDefined();
      expect(result.id).toBe('new-faculty');
      expect(result.name).toBe('New Faculty');
      expect(mockFacultyService.create).toHaveBeenCalledWith(newFaculty);
    });
  });

  describe('update', () => {
    it('should update an existing faculty', () => {
      const facultyId = 'computer-science';
      const updateDto = { 
        description: 'Updated description of Computer Science' 
      };
      const updatedFaculty = {
        ...mockFaculties[0],
        ...updateDto
      };

      mockFacultyService.update.mockReturnValueOnce(updatedFaculty);
      const result = controller.update(facultyId, updateDto);
      
      expect(result).toBeDefined();
      expect(result.id).toBe(facultyId);
      expect(result.description).toBe('Updated description of Computer Science');
      expect(mockFacultyService.update).toHaveBeenCalledWith(facultyId, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a faculty', () => {
      const facultyId = 'computer-science';
      mockFacultyService.remove.mockReturnValueOnce(mockFaculties[0]);

      const result = controller.remove(facultyId);
      
      expect(result).toBeDefined();
      expect(result.id).toBe(facultyId);
      expect(mockFacultyService.remove).toHaveBeenCalledWith(facultyId);
    });
  });
});