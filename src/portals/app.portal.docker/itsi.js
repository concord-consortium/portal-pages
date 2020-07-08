// this was removed for the time being because it was empty
// var earlyElementaryBin = {
//   category: 'Early Elementary K-2 Physical Science',
//   className: 'earlyelementary-K2',
//   children: [
//     {
//       collections: [
//         {
//           id: 1
//         }
//       ]
//     }
//   ]
// }

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
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/playground-design'
          },
          {
            id: 1
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
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/habitat-and-life-cycles'
          },
          {
            id: 1
          },
          {
            id: 1,
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
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/electricity-and-magnetism-teacher-guide'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/friction'
          },
          {
            id: 1
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
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/planets-and-moons'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/soil-and-rocks'
          },
          {
            id: 1,
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
            id: 1
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/living-environment-teacher-guide'
          },
          {
            id: 1
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
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/cycles-teacher-guide'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/energy-transformations-es-teacher-guide'
          },
          {
            id: 1,
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
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/climate-change-teacher-guide-ms'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/crystals-teacher-guide'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/earthquakes-teacher-guide'
          },
          {
            id: 1
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/water-cycle-teacher-guide-middle-school'
          },
          {
            id: 1
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
            id: 1,
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
            id: 1,
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
            id: 1
          },
          {
            id: 1
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/inheritance-teacher-guide'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/photosynthesis-teacher-guide'
          },
          {
            id: 1
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
            id: 1
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/heat-and-temperature'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/molecular-motion-teacher-guide'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/motion'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/phase-change'
          },
          {
            id: 1,
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
            id: 1
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/evolution'
          },
          {
            id: 1
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/molecular-motion'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/populations-hs-teacher-guide'
          },
          {
            id: 1,
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
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/atomic-structure'
          },
          {
            id: 1
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/driving-forces-of-reactions'
          },
          {
            id: 1
          },
          {
            id: 1
          },
          {
            id: 1
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
            id: 1,
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
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/climate-change'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/collisions-teacher-guide'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/electricity'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/heat-transfer'
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/light-and-matter-teacher-guide'
          },
          {
            id: 1
          },
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/ramps-and-friction'
          },
          {
            id: 1,
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
            id: 1
          },
          {
            id: 1
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

PortalComponents.renderMaterialsBin(MATERIALS, '#bin-view')
PortalComponents.renderNavigation(Portal.API_V1.getNavigation(), 'clazzes_nav')
