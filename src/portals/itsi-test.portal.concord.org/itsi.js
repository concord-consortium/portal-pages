// this was removed for the time being because it was empty
// var earlyElementaryBin =    {
//     category: "Early Elementary K-2 Physical Science",
//     className: "earlyelementary-K2",
//     children: [
//       {
//         collections: [
//           {
//             id: 62
//           }
//         ]
//       }
//     ]
//   };

var MATERIALS = [
  {
    category: 'Elementary 3-4 Engineering',
    className: 'elementary-34',
    children: [
      {
        collections: [
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/energy-production-teacher-guide'
          },
          {
            id: 2,
            teacherGuideUrl: 'https://guides.itsi.concord.org/playground-design'
          },
          {
            id: 3
          }
        ]
      }
    ]
  },
  {
    category: 'Elementary 3-4 Life Science',
    className: 'elementary-34',
    children: [
      {
        collections: [
          {
            id: 4,
            teacherGuideUrl: 'https://guides.itsi.concord.org/habitat-and-life-cycles'
          },
          {
            id: 5
          },
          {
            id: 6,
            teacherGuideUrl: 'https://guides.itsi.concord.org/senses'
          }
        ]
      }
    ]
  },
  {
    category: 'Elementary 3-4 Physical Science',
    className: 'elementary-34',
    children: [
      {
        collections: [
          {
            id: 7,
            teacherGuideUrl: 'https://guides.itsi.concord.org/electricity-and-magnetism-teacher-guide'
          },
          {
            id: 8,
            teacherGuideUrl: 'https://guides.itsi.concord.org/friction'
          },
          {
            id: 9
          }
        ]
      }
    ]
  },
  {
    category: 'Elementary 5-6 Earth Science',
    className: 'elementary-56',
    children: [
      {
        collections: [
          {
            id: 10,
            teacherGuideUrl: 'https://guides.itsi.concord.org/planets-and-moons'
          },
          {
            id: 11,
            teacherGuideUrl: 'https://guides.itsi.concord.org/soil-and-rocks'
          },
          {
            id: 12,
            teacherGuideUrl: 'https://guides.itsi.concord.org/water-cycle-teacher-guide'
          }
        ]
      }
    ]
  },
  {
    category: 'Elementary 5-6 Life Science',
    className: 'elementary-56',
    children: [
      {
        collections: [
          {
            id: 13
          },
          {
            id: 14,
            teacherGuideUrl: 'https://guides.itsi.concord.org/living-environment-teacher-guide'
          },
          {
            id: 15
          }
        ]
      }
    ]
  },
  {
    category: 'Elementary 5-6 Physical Science',
    className: 'elementary-56',
    children: [
      {
        collections: [
          {
            id: 16,
            teacherGuideUrl: 'https://guides.itsi.concord.org/cycles-teacher-guide'
          },
          {
            id: 17,
            teacherGuideUrl: 'https://guides.itsi.concord.org/energy-transformations-es-teacher-guide'
          },
          {
            id: 18,
            teacherGuideUrl: 'https://guides.itsi.concord.org/forces-and-motion-teacher-guide'
          }
        ]
      }
    ]
  },
  {
    category: 'Middle School Earth Science',
    className: 'middle-school',
    children: [
      {
        collections: [
          {
            id: 19,
            teacherGuideUrl: 'https://guides.itsi.concord.org/climate-change-teacher-guide-ms'
          },
          {
            id: 20,
            teacherGuideUrl: 'https://guides.itsi.concord.org/crystals-teacher-guide'
          },
          {
            id: 21,
            teacherGuideUrl: 'https://guides.itsi.concord.org/earthquakes-teacher-guide'
          },
          {
            id: 22
          },
          {
            id: 23,
            teacherGuideUrl: 'https://guides.itsi.concord.org/water-cycle-teacher-guide-middle-school'
          },
          {
            id: 24
          }
        ]
      }
    ]
  },
  {
    category: 'Middle School Engineering',
    className: 'middle-school',
    children: [
      {
        collections: [
          {
            id: 25,
            teacherGuideUrl: 'https://guides.itsi.concord.org/energy-transformations-teacher-guide'
          }
        ]
      }
    ]
  },
  {
    category: 'Middle School Environmental Science',
    className: 'middle-school',
    children: [
      {
        collections: [
          {
            id: 50,
            teacherGuideUrl: 'https://guides.itsi.concord.org/water-science-teacher-guides'
          }
        ]
      }
    ]
  },
  {
    category: 'Middle School Life Science',
    className: 'middle-school',
    children: [
      {
        collections: [
          {
            id: 26
          },
          {
            id: 27
          },
          {
            id: 28,
            teacherGuideUrl: 'https://guides.itsi.concord.org/inheritance-teacher-guide'
          },
          {
            id: 29,
            teacherGuideUrl: 'https://guides.itsi.concord.org/photosynthesis-teacher-guide'
          },
          {
            id: 30
          }
        ]
      }
    ]
  },
  {
    category: 'Middle School Physical Science',
    className: 'middle-school',
    children: [
      {
        collections: [
          {
            id: 32
          },
          {
            id: 33,
            teacherGuideUrl: 'https://guides.itsi.concord.org/heat-and-temperature'
          },
          {
            id: 34,
            teacherGuideUrl: 'https://guides.itsi.concord.org/molecular-motion-teacher-guide'
          },
          {
            id: 35,
            teacherGuideUrl: 'https://guides.itsi.concord.org/motion'
          },
          {
            id: 36,
            teacherGuideUrl: 'https://guides.itsi.concord.org/phase-change'
          },
          {
            id: 37,
            teacherGuideUrl: 'https://guides.itsi.concord.org/sound'
          }
        ]
      }
    ]
  },
  {
    category: 'High School Biology',
    className: 'high-school',
    children: [
      {
        collections: [
          {
            id: 38
          },
          {
            id: 39,
            teacherGuideUrl: 'https://guides.itsi.concord.org/evolution'
          },
          {
            id: 40
          },
          {
            id: 41,
            teacherGuideUrl: 'https://guides.itsi.concord.org/molecular-motion'
          },
          {
            id: 42,
            teacherGuideUrl: 'https://guides.itsi.concord.org/populations-hs-teacher-guide'
          },
          {
            id: 43,
            teacherGuideUrl: 'https://guides.itsi.concord.org/protein-structure'
          }
        ]
      }
    ]
  },
  {
    category: 'High School Chemistry',
    className: 'high-school',
    children: [
      {
        collections: [
          {
            id: 44,
            teacherGuideUrl: 'https://guides.itsi.concord.org/atomic-structure'
          },
          {
            id: 45
          },
          {
            id: 46,
            teacherGuideUrl: 'https://guides.itsi.concord.org/driving-forces-of-reactions'
          },
          {
            id: 47
          },
          {
            id: 48
          },
          {
            id: 49
          }
        ]
      }
    ]
  },
  {
    category: 'High School Environmental Science',
    className: 'high-school',
    children: [
      {
        collections: [
          {
            id: 64,
            teacherGuideUrl: 'https://guides.itsi.concord.org/teaching-environmental-sustainability-model-my-watershed-teacher-guide-2016'
          }
        ]
      }
    ]
  },
  {
    category: 'High School Physics',
    className: 'high-school',
    children: [
      {
        collections: [
          {
            id: 51,
            teacherGuideUrl: 'https://guides.itsi.concord.org/climate-change'
          },
          {
            id: 52,
            teacherGuideUrl: 'https://guides.itsi.concord.org/collisions-teacher-guide'
          },
          {
            id: 53,
            teacherGuideUrl: 'https://guides.itsi.concord.org/electricity'
          },
          {
            id: 54,
            teacherGuideUrl: 'https://guides.itsi.concord.org/heat-transfer'
          },
          {
            id: 55,
            teacherGuideUrl: 'https://guides.itsi.concord.org/light-and-matter-teacher-guide'
          },
          {
            id: 56
          },
          {
            id: 57,
            teacherGuideUrl: 'https://guides.itsi.concord.org/ramps-and-friction'
          },
          {
            id: 58,
            teacherGuideUrl: 'https://guides.itsi.concord.org/waves'
          }
        ]
      }
    ]
  },
  {
    category: 'STEM Career Surveys',
    className: 'high-school',
    children: [
      {
        collections: [
          {
            id: 60
          },
          {
            id: 61
          }
        ]
      }
    ]
  },
  {
    category: 'My activities',
    loginRequired: true,
    className: 'other-cat',
    children: [
      {
        ownMaterials: true
      }
    ]
  },
  {
    category: 'Other activities',
    loginRequired: true,
    className: 'other-cat',
    children: [
      {
        materialsByAuthor: true
      }
    ]
  }
]

Portal.renderMaterialsBin(MATERIALS, '#bin-view')
PortalPages.renderNavigation(Portal.API_V1.getNavigation(), 'clazzes_nav')
