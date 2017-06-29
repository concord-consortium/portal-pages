module.exports = {
  subjectAreas: [
    {key: "physics-chemistry", title: "Physics & Chemistry", searchAreas: ["Chemistry", "Physics"]},
    {key: "life-sciences", title: "Life Science", searchAreas: ["Biology"]},
    {key: "engineering-tech", title: "Engineering & Tech", searchAreas: ["Engineering"]},
    {key: "earth-space", title: "Earth & Space", searchAreas: ["Earth and Space Science"]},
    {key: "mathematics", title: "Mathematics", searchAreas: ["Mathematics"]}
  ],

  featureFilters: [
    {key: "sequence", title: "Sequence", searchMaterialType: "Investigation"},
    {key: "model", title: "Model", searchMaterialType: "Interactive"},
    {key: "browser-based", title: "Browser-Based", searchMaterialProperty: "Runs in browser"},
    {key: "activity", title: "Activity", searchMaterialType: "Activity"},
    //{key: "sensor-based", title: "Sensor-Based (TODO)"},
  ],

  gradeFilters: [
    {key: "elementary-school", title: "Elementary", grades: ["K", "1", "2", "3", "4", "5", "6"], label: "K-6", searchGroups: ["K-2", "3-4", "5-6"]},
    {key: "middle-school", title: "Middle School", grades: ["7", "8"], label: "7-8", searchGroups: ["7-8"]},
    {key: "high-school", title: "High School", grades: ["9", "10", "11", "12"], label: "9-12", searchGroups: ["9-12"]},
    {key: "higher-education", title: "Higher Education", grades: ["Higher Ed"], label: "Higher Education", searchGroups: ["Higher Ed"]}
    //{key: "informal-learning", title: "Informal Learning (TODO)", grades: [], label: "Informal Learning"},
  ]
};