/* globals describe it expect */

import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MaterialsBin from 'components/materials-bin/materials-bin'
import { pack } from "../../helpers/pack"
import {mockJquery} from "../../helpers/mock-jquery"

var materials = [
  {
    category: "Cat A",
    className: "custom-category-class",
    children: [
      {
        category: "Cat A1",
        children: [
          {
            collections: [
              {id: 1}
             ]
          }
        ]
      },
      {
        category: "Cat A2",
        children: []
      }
    ]
  },
  {
    category: "Cat B",
    children: [
      {
        category: "Cat B1",
        children: [
          {
            collections: [
              {id: 2}
             ]
          }
        ]
      },
      {
        category: "Cat B2",
        children: []
      }
    ]
  },
  {
    category: "Cat C",
    loginRequired: true,
    children: [
      {
        ownMaterials: true
      }
    ]
  },
  {
    category: "Cat D",
    children: [
      {
        materialsByAuthor: true
      }
    ]
  },
  {
    category: "Cat E",
    children: [
      {
        collections: [
          {
            id: 1,
            teacherGuideUrl: 'https://guides.itsi.concord.org/energy-production-teacher-guide.html'
          }
        ]
      }
    ]
  },

];

global.Portal = {
  API_V1: {
    MATERIALS_OWN: "https://example.com/"
  },
  currentUser: {
    isTeacher: true
  }
};

const collectionsResult = [
  {
    "name":"Collection",
    "materials":[
      {"id":21,"name":"Solar Oven","long_description_for_current_user":"Design, build, and test a solar oven.","long_description":"Design, build, and test a solar oven.","long_description_for_teacher":"","short_description":"Design, build, and test a solar oven.","class_name":"ExternalActivity","class_name_underscored":"external_activity","icon":{"url":"https://learn-resources.concord.org/images/stem-resources/icons/solar-oven.jpg"},"material_properties":[],"is_official":true,"is_archived":false,"is_favorite":false,"favorite_id":null,"subject_areas":["Engineering"],"grade_levels":["3","4"],"projects":[],"publication_status":"published","links":{"browse":{"url":"https://itsi.portal.concord.org/browse/eresources/21"},"preview":{"url":"https://itsi.portal.concord.org/eresources/21.run_resource_html","text":"Preview","target":"_blank"},"print_url":{"text":"Print","target":"_blank","url":"https://authoring.concord.org/activities/988/print_blank"}},"preview_url":"https://itsi.portal.concord.org/eresources/21.run_resource_html","edit_url":null,"unarchive_url":null,"archive_url":null,"copy_url":null,"assign_to_class_url":null,"assign_to_collection_url":null,"assigned_classes":[],"class_count":37,"sensors":[],"has_activities":false,"has_pretest":false,"saves_student_data":true,"activities":[],"lara_activity_or_sequence":true,"parent":null,"user":{"id":32,"name":"ITSI ITEST"},"assigned":false,"credits":null,"license_info":{"name":"Modifications YES, commercial use YES, sharing required  NO (CC-BY-4.0)","code":"CC-BY 4.0","deed":"http://creativecommons.org/licenses/by/4.0/","legal":"http://creativecommons.org/licenses/by/4.0/legalcode","image":"http://i.creativecommons.org/l/by/4.0/88x31.png","description":"This license lets others distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation. This is the most accommodating of licenses offered. Recommended for maximum dissemination and use of licensed materials.","number":1},"related_materials":[],"standard_statements":[],"enable_sharing":true,"slug":"solar-oven","stem_resource_url":"https://itsi.portal.concord.org/resources/21/solar-oven"},
      {"id":22,"name":"Wind Generator","long_description_for_current_user":"Build a wind turbine and test different blade designs to generate electricity.","long_description":"Build a wind turbine and test different blade designs to generate electricity.","long_description_for_teacher":"","short_description":"Build a wind turbine and test different blade designs to generate electricity.","class_name":"ExternalActivity","class_name_underscored":"external_activity","icon":{"url":"https://learn-resources.s3.amazonaws.com/images/stem-resources/icons/wind-generator.jpg"},"material_properties":[],"is_official":true,"is_archived":false,"is_favorite":false,"favorite_id":null,"subject_areas":["Engineering"],"grade_levels":["3","4"],"projects":[],"publication_status":"published","links":{"browse":{"url":"https://itsi.portal.concord.org/browse/eresources/22"},"preview":{"url":"https://itsi.portal.concord.org/eresources/22.run_resource_html","text":"Preview","target":"_blank"},"print_url":{"text":"Print","target":"_blank","url":"https://authoring.concord.org/activities/989/print_blank"}},"preview_url":"https://itsi.portal.concord.org/eresources/22.run_resource_html","edit_url":null,"unarchive_url":null,"archive_url":null,"copy_url":null,"assign_to_class_url":null,"assign_to_collection_url":null,"assigned_classes":[],"class_count":21,"sensors":[],"has_activities":false,"has_pretest":false,"saves_student_data":true,"activities":[],"lara_activity_or_sequence":true,"parent":null,"user":{"id":32,"name":"ITSI ITEST"},"assigned":false,"credits":null,"license_info":{"name":"Modifications YES, commercial use YES, sharing required  NO (CC-BY-4.0)","code":"CC-BY 4.0","deed":"http://creativecommons.org/licenses/by/4.0/","legal":"http://creativecommons.org/licenses/by/4.0/legalcode","image":"http://i.creativecommons.org/l/by/4.0/88x31.png","description":"This license lets others distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation. This is the most accommodating of licenses offered. Recommended for maximum dissemination and use of licensed materials.","number":1},"related_materials":[],"standard_statements":[],"enable_sharing":true,"slug":"wind-generator","stem_resource_url":"https://itsi.portal.concord.org/resources/22/wind-generator"}]},{"name":"Playground design","materials":[{"id":17,"name":"Building a Bungee Jump","long_description_for_current_user":"In this activity you will study and build a bungee jump that is safe and fun to use.","long_description":"In this activity you will study and build a bungee jump that is safe and fun to use.","long_description_for_teacher":"","short_description":"In this activity you will study and build a bungee jump that is safe and fun to use.","class_name":"ExternalActivity","class_name_underscored":"external_activity","icon":{"url":"https://learn-resources.concord.org/images/stem-resources/icons/bungee-jump.jpg"},"material_properties":[],"is_official":true,"is_archived":false,"is_favorite":false,"favorite_id":null,"subject_areas":["Engineering"],"grade_levels":["3","4"],"projects":[],"publication_status":"published","links":{"browse":{"url":"https://itsi.portal.concord.org/browse/eresources/17"},"preview":{"url":"https://itsi.portal.concord.org/eresources/17.run_resource_html","text":"Preview","target":"_blank"},"print_url":{"text":"Print","target":"_blank","url":"https://authoring.concord.org/activities/984/print_blank"}},"preview_url":"https://itsi.portal.concord.org/eresources/17.run_resource_html","edit_url":null,"unarchive_url":null,"archive_url":null,"copy_url":null,"assign_to_class_url":null,"assign_to_collection_url":null,"assigned_classes":[],"class_count":12,"sensors":[],"has_activities":false,"has_pretest":false,"saves_student_data":true,"activities":[],"lara_activity_or_sequence":true,"parent":null,"user":{"id":32,"name":"ITSI ITEST"},"assigned":false,"credits":null,"license_info":{"name":"Modifications YES, commercial use YES, sharing required  NO (CC-BY-4.0)","code":"CC-BY 4.0","deed":"http://creativecommons.org/licenses/by/4.0/","legal":"http://creativecommons.org/licenses/by/4.0/legalcode","image":"http://i.creativecommons.org/l/by/4.0/88x31.png","description":"This license lets others distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation. This is the most accommodating of licenses offered. Recommended for maximum dissemination and use of licensed materials.","number":1},"related_materials":[],"standard_statements":[],"enable_sharing":true,"slug":"building-a-bungee-jump","stem_resource_url":"https://itsi.portal.concord.org/resources/17/building-a-bungee-jump"}
    ]
  }
]

const mockedJQuery = () => ({
  on: (message) => {},
});
mockedJQuery.trim = (s) => s.trim()
mockedJQuery.ajax = jest.fn().mockImplementation((options) => {
  options.success(collectionsResult)
})

Enzyme.configure({adapter: new Adapter()})

describe('When I try to render materials-bin', () => {

  mockJquery(mockedJQuery)

  it("should render with default props", () => {
    const materialsBin = Enzyme.shallow(<MaterialsBin materials={materials} />);
    expect(materialsBin.html()).toBe(pack(`
      <div class="materials-bin">
        <div class="mb-column">
          <div class="mb-cell mb-category mb-clickable custom-category-class  mb-selected">Cat A</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat B</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat C</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat D</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat E</div>
        </div>
        <div class="mb-column">
          <div class="mb-cell mb-category mb-clickable   mb-selected">Cat A1</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat A2</div>
          <div class="mb-cell mb-category mb-clickable  mb-hidden ">Cat B1</div>
          <div class="mb-cell mb-category mb-clickable  mb-hidden ">Cat B2</div>
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
        </div>
        <div class="mb-column">
          <div class="mb-cell ">
            <div>Loading...</div>
          </div>
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
        </div>
      </div>
    `));
  });

  it("should handle clicking of categories without collections", () => {
    const materialsBin = Enzyme.mount(<MaterialsBin materials={materials} />);
    const categoryB = materialsBin.find({slug: "cat-b"});
    categoryB.simulate("click")
    materialsBin.instance().checkHash()
    materialsBin.update();
    expect(materialsBin.html()).toBe(pack(`
      <div class="materials-bin">
        <div class="mb-column">
          <div class="mb-cell mb-category mb-clickable custom-category-class  ">Cat A</div>
          <div class="mb-cell mb-category mb-clickable   mb-selected">Cat B</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat C</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat D</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat E</div>
        </div>
        <div class="mb-column">
          <div class="mb-cell mb-category mb-clickable  mb-hidden ">Cat A1</div>
          <div class="mb-cell mb-category mb-clickable  mb-hidden ">Cat A2</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat B1</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat B2</div>
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
        </div>
        <div class="mb-column">
          <div class="mb-cell mb-hidden">
            <div class="mb-collection">
              <div class="mb-collection-name">Collection</div>
              <div class="mb-material">
                <span class="mb-material-links">
                  <a class="mb-toggle-info" href="" title="View activity description">
                    <span class="mb-toggle-info-text">Info</span>
                  </a>
                  <a class="mb-run" href="https://itsi.portal.concord.org/eresources/21.run_resource_html" title="Run this activity in the browser">
                    <span class="mb-run-text">Run</span>
                  </a>
                </span>
                <span class="mb-material-name">Solar Oven</span>
                <div class="mb-material-description mb-hidden">Design, build, and test a solar oven.</div>
              </div>
              <div class="mb-material">
                <span class="mb-material-links">
                  <a class="mb-toggle-info" href="" title="View activity description">
                    <span class="mb-toggle-info-text">Info</span>
                  </a>
                  <a class="mb-run" href="https://itsi.portal.concord.org/eresources/22.run_resource_html" title="Run this activity in the browser">
                    <span class="mb-run-text">Run</span>
                  </a>
                </span>
                <span class="mb-material-name">Wind Generator</span>
                <div class="mb-material-description mb-hidden">Build a wind turbine and test different blade designs to generate electricity.</div>
              </div>
            </div>
            <div class="mb-collection">
              <div class="mb-collection-name">Playground design</div>
              <div class="mb-material">
                <span class="mb-material-links">
                  <a class="mb-toggle-info" href="" title="View activity description">
                    <span class="mb-toggle-info-text">Info</span>
                  </a>
                  <a class="mb-run" href="https://itsi.portal.concord.org/eresources/17.run_resource_html" title="Run this activity in the browser">
                    <span class="mb-run-text">Run</span>
                  </a>
                </span>
                <span class="mb-material-name">Building a Bungee Jump</span>
                <div class="mb-material-description mb-hidden">In this activity you will study and build a bungee jump that is safe and fun to use.</div>
              </div>
            </div>
          </div>
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
        </div>
      </div>
    `));
  });

  it("should handle clicking of categories with collections", () => {
    const materialsBin = Enzyme.mount(<MaterialsBin materials={materials} />);
    const categoryE = materialsBin.find({slug: "cat-e"});
    categoryE.simulate("click")
    materialsBin.instance().checkHash()
    materialsBin.update();
    expect(materialsBin.html()).toBe(pack(`
      <div class="materials-bin">
        <div class="mb-column">
          <div class="mb-cell mb-category mb-clickable custom-category-class  ">Cat A</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat B</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat C</div>
          <div class="mb-cell mb-category mb-clickable   ">Cat D</div>
          <div class="mb-cell mb-category mb-clickable   mb-selected">Cat E</div>
        </div>
        <div class="mb-column">
          <div class="mb-cell mb-category mb-clickable  mb-hidden ">Cat A1</div>
          <div class="mb-cell mb-category mb-clickable  mb-hidden ">Cat A2</div>
          <div class="mb-cell mb-category mb-clickable  mb-hidden ">Cat B1</div>
          <div class="mb-cell mb-category mb-clickable  mb-hidden ">Cat B2</div>
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
          <div class="mb-cell ">
            <div class="mb-collection">
              <div class="mb-collection-name">Collection</div>
              <a href="https://guides.itsi.concord.org/energy-production-teacher-guide.html" target="_blank">Teacher Guide</a>
              <div class="mb-material">
                <span class="mb-material-links">
                  <a class="mb-toggle-info" href="" title="View activity description">
                    <span class="mb-toggle-info-text">Info</span>
                  </a>
                  <a class="mb-run" href="https://itsi.portal.concord.org/eresources/21.run_resource_html" title="Run this activity in the browser">
                    <span class="mb-run-text">Run</span>
                  </a>
                </span>
                <span class="mb-material-name">Solar Oven</span>
                <div class="mb-material-description mb-hidden">Design, build, and test a solar oven.</div>
              </div>
              <div class="mb-material">
                <span class="mb-material-links">
                  <a class="mb-toggle-info" href="" title="View activity description">
                    <span class="mb-toggle-info-text">Info</span>
                  </a>
                  <a class="mb-run" href="https://itsi.portal.concord.org/eresources/22.run_resource_html" title="Run this activity in the browser">
                    <span class="mb-run-text">Run</span>
                  </a>
                </span>
                <span class="mb-material-name">Wind Generator</span>
                <div class="mb-material-description mb-hidden">Build a wind turbine and test different blade designs to generate electricity.</div>
              </div>
            </div>
            <div class="mb-collection">
              <div class="mb-collection-name">Playground design</div>
              <div class="mb-material">
                <span class="mb-material-links">
                  <a class="mb-toggle-info" href="" title="View activity description">
                    <span class="mb-toggle-info-text">Info</span>
                  </a>
                  <a class="mb-run" href="https://itsi.portal.concord.org/eresources/17.run_resource_html" title="Run this activity in the browser">
                    <span class="mb-run-text">Run</span>
                  </a>
                </span>
                <span class="mb-material-name">Building a Bungee Jump</span>
                <div class="mb-material-description mb-hidden">In this activity you will study and build a bungee jump that is safe and fun to use.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-column">
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
          <div class="mb-cell mb-hidden">
            <div>Loading...</div>
          </div>
        </div>
      </div>
    `));
  });

})
