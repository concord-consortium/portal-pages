var div = React.DOM.div;
var button = React.DOM.button;
var a = React.DOM.a;
var svg = React.DOM.svg;
var circle = React.DOM.circle;
var text = React.DOM.text;
var input = React.DOM.input;
var span = React.DOM.span;
var form = React.DOM.form;
var pre = React.DOM.pre;
var img = React.DOM.img;

var fadeIn = function (component, duration) {
  var interval = 10,
      increment = interval / duration,
      animateOpacity = function () {
        var opacity = Math.min(component.state.opacity + increment, 1);
        component.setState({opacity: opacity});
        if (opacity === 1) {
          clearInterval(animation);
        }
      },
      animation = setInterval(animateOpacity, interval);
};

var sortByName = function (a, b) {
  return a.name.toUpperCase() - b.name.toUpperCase();
};

// from https://stackoverflow.com/a/12646864
var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var lorem = function (min, max) {
  var words = ['lorem', 'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero', 'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut', 'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia', 'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis', 'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros', 'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa', 'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus', 'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus', 'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam', 'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in', 'hac', 'habitasse', 'platea', 'dictumst', 'aenean', 'neque', 'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis', 'tortor', 'scelerisque', 'nulla', 'interdum', 'tellus', 'malesuada', 'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam', 'suspendisse', 'potenti', 'vivamus', 'luctus', 'fringilla', 'erat', 'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante', 'primis', 'faucibus', 'ultrices', 'posuere', 'cubilia', 'curae', 'etiam', 'cursus', 'aliquam', 'quam', 'dapibus', 'nisl', 'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu', 'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra', 'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae', 'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu', 'morbi', 'pellentesque', 'metus', 'commodo', 'ut', 'facilisis', 'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis', 'sollicitudin', 'integer', 'rutrum', 'duis', 'est', 'etiam', 'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi', 'fermentum', 'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus', 'netus', 'fames', 'quisque', 'euismod', 'curabitur', 'lectus', 'elementum', 'tempor', 'risus', 'cras'];
  min = Math.min(min || 5, words.length);
  max = Math.min(Math.max(max, min), words.length);
  var wordCount = min + Math.floor(Math.random() * (max - min));
  var result = [];
  shuffleArray(words);
  for (var i = 0; i < wordCount; i++) {
    result.push(words[i][0].toUpperCase() + words[i].substr(1));
  }
  return result.join(" ");
};

var randomSubset = function (array) {
  var count = Math.round(Math.random() * array.length);
  var subset = array.slice(0, count);
  return shuffleArray(subset);
};

var fakeResourceIconUrls = shuffleArray([
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/1A.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/1B.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/1C.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/2A.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/3A.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/3C.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/3D.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/3E.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/4A1.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/4A2.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/4B.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/4C.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/4D.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/4E.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/6A.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/6B.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/6C.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/Atomic_Structure.gif",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/atoms-energy.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/boiling-point.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/catalysts.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/cb_0.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/cellular-respiration.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/ceramic-forces.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/charged-neutral-atoms.gif",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/chemical-reactions.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/clouds.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/DescribingVel1t_0.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/diffusion_0.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/diffusion-drop.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/diffusion-molecular-mass.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/diffusion-semipermeable-membrane.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/diffusion-temperature.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/dipole-london-dispersion.gif",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/dna-protein.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/dna-protein_0.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/eiam.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/electric-current_0.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/electrostatics_0.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/ER_Activity1.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/ER_Activity2.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/ER-Activity10.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/ER-Activity3.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/ER-Activity4.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/ER-Activity5.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/ER-Activity6.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/ER-Activity7.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/ER-Activity8.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/ER-Activity9.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/excited-states.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/exponential-decay1.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/expontial-growth1.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/Galileo1t_0.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/gas-laws.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/graph-exponential-equations1.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/how-electrons-move.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/HowFast1t_0.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/hydrogen-bonds.gif",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/intermolecular-attractions.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/intermolecular-attractions_0.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/inverses1.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/linear-word-problems.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/london-dispersion.gif",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/marias.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/meiosis-lab_0.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/metal-forces.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/Microscope.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/modeling-transcription.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/modeling-translation.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/modern-genetics.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/molecular-geometry.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/molecular-view-gas.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/molecular-view-liquid.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/molecular-view-solid.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/mutations.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/mxb1.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/oil-water.gif",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/parachute.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/pendulum.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/pendulum-spring.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/phase-change.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/phase-change.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/plants.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/plastic-forces.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/points-intercepts-slopes.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/polarityattractivestrength.gif",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/protein-folding.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/protein-partnering.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/Quadr.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/Quad-vertex-thumb.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/QuadWord1.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/QuadWord2-thumb.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/QuantumBasic.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/seeing-intermolecular-attractions.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/self-assembly.gif",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/Semiconductor.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/SkiSlope.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/solubility.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/sp1.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/sp2.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/spectroscopy.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/spring-model.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/Sunlight-IR-CO2t.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/systems-equations.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/temppressurerelationship.gif",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/tempvolumerelationship.gif",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/tire-forces.jpg",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/transformations1.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/transformations2.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/transformations3.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/transformations4.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/transistor_0.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/tree-of-life.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/Tunneling.png",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/volumepressurerelationship.gif",
  "http://concord.org/sites/default/files/imagecache/image_activity_finder/whatispressure.gif",
  "https://cc-project-resources.s3.amazonaws.com/teaching-teamwork/Adder/7404.png",
  "https://concord.org/sites/default/files/imagecache/image_activity_finder/african-lions.jpg",
  "https://concord.org/sites/default/files/imagecache/image_activity_finder/comparing-attractions-thumb.png",
  "https://concord.org/sites/default/files/imagecache/image_activity_finder/concentrating-charge.jpg",
  "https://concord.org/sites/default/files/imagecache/image_activity_finder/crookes.jpg",
  "https://concord.org/sites/default/files/imagecache/image_activity_finder/electron-properties.jpg",
  "https://concord.org/sites/default/files/projects/teaching-teamwork/PIC-diplsay.png",
  "https://concord.org/sites/default/files/styles/image_srf/public/antibody.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/atom-ion-builder_0.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/atom-ion-builder_1.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/balloon-wall.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/boiling-point-polar-nonpolar.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/bond-formation_0.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/breaking-molecular-bond.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/chain-reaction-hydrogen-oxygen.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/charge-intensity_0.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/charge-intensity-2.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/collisions-kinetic-energy-2.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/comparing-attractive-forces.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/comparing-potential-energy.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/concentrating-fields-electric-charge.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/conversion-electric-potential-energy-2.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/deformed-cloud-2.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/direction-force-charged-object.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/direction-force-vdg-negative.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/direction-strength-force-electric-fields.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/dissolving.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/dissolving-experimental.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/electric-potential-energy-2.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/electric-potential-energy-charge-intensity-2.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/electrostatics-maze-game.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/elements-polarity-2.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/energy-of-pendulum.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/energy-spring.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/exploring-electron-properties.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/forming-molecular-bond.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/forming-molecule.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/gas-pressure-syringe.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/hydrophobic-core.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/make-break-bonds-temp.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/making-molecules.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/micelles.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/mixing-liquids_1.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/molecular-sorting.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/non-bonding-conceptual.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/object-charged.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/opposites-attract.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/polarization.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/polar-nonpolar-interface.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/protein-3d-structure_0.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/reaction-hydrogen-oxygen.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/reaction-hydrogen-oxygen-atoms.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/seismic-explorer.png",
  "https://concord.org/sites/default/files/styles/image_srf/public/spark-explosion.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/structure-atom.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/target-game-charge-magnitude.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/target-game-distance-force.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/target-game-free-play.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/understanding-probability-maps-2.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/vdg-discharge.jpg",
  "https://concord.org/sites/default/files/styles/image_srf/public/visualizing-electric-fields-forces_0.jpg",
  "https://concord.org/sites/default/files/three-resistors-solo.png",
  "https://concord.org/sites/default/files/three-resistors-team.png",
  "https://geniverse-resources.concord.org/resources/images/gv-office-thumbnail.jpg",
  "https://has-resources.concord.org/resources/thumbnails/air.png",
  "https://has-resources.concord.org/resources/thumbnails/climate.png",
  "https://has-resources.concord.org/resources/thumbnails/energy.png",
  "https://has-resources.concord.org/resources/thumbnails/Espanolair.png",
  "https://has-resources.concord.org/resources/thumbnails/land2.png",
  "https://has-resources.concord.org/resources/thumbnails/life-in-space.png",
  "https://has-resources.concord.org/resources/thumbnails/water.png",
  "https://inquiryspace-resources.concord.org/inquiryspacegraphics/parachute.png",
  "https://inquiryspace-resources.concord.org/inquiryspacegraphics/ramp-game.png",
  "https://inquiryspace-resources.concord.org/inquiryspacegraphics/sensors2.png",
  "https://inquiryspace-resources.concord.org/inquiryspacegraphics/spring.png",
  "https://interactions-resources.concord.org/Balance.png",
  "https://interactions-resources.concord.org/inv1/Front_loading_laundry_machine.jpg",
  "https://interactions-resources.concord.org/thumbnails/unit1/inv2/bee-pollen.png",
  "https://interactions-resources.concord.org/thumbnails/unit1/inv5/particles.jpg",
  "https://interactions-resources.concord.org/thumbnails/unit1/inv6/sandstone-wall.jpg",
  "https://interactions-resources.concord.org/thumbnails/unit1/inv7/wig.jpg",
  "https://interactions-resources.concord.org/thumbnails/unit2/Inv1/spark.jpg",
  "https://interactions-resources.concord.org/thumbnails/unit2/inv2/2.0-sparks.jpg",
  "https://interactions-resources.concord.org/thumbnails/unit3/inv1/water-bottle.jpg",
  "https://interactions-resources.concord.org/thumbnails/unit4/inv1/fever.png",
  "https://interactions-resources.concord.org/unit2/inv3/spark-plug.png",
  "https://interactions-resources.concord.org/unit3/TN-Inv3-2.jpg",
  "https://learn-resources.concord.org/images/sparks/dc-circuit-series-resistances-1.png",
  "https://learn-resources.concord.org/images/sparks/dc-circuits-parallel-resistances-1.png",
  "https://learn-resources.concord.org/images/sparks/dc-circuits-series-parallel-resistances-1.png",
  "https://learn-resources.concord.org/images/sparks/troubleshooting-dc-circuits-1.png",
  "https://nextgen-resources.concord.org/portalthumbs/boiling-point.png",
  "https://nextgen-resources.concord.org/portalthumbs/diffusion.png",
  "https://nextgen-resources.concord.org/portalthumbs/gas-laws-weather-balloons.png",
  "https://nextgen-resources.concord.org/portalthumbs/genigames.jpg",
  "https://nextgen-resources.concord.org/portalthumbs/how-do-cells-make-proteins.png",
  "https://nextgen-resources.concord.org/portalthumbs/human-biology.png",
  "https://nextgen-resources.concord.org/portalthumbs/solubility.png",
  "https://nextgen-resources.concord.org/portalthumbs/states-matter.png"
]);

/*** React Functions ***/

var Component = function (options) {
  return React.createFactory(React.createClass(options));
};

var UserAuth = Component({
  getInitialState: function () {
    return {
      loggedIn: Portal.currentUser.isLoggedIn,
      opacity: 0,
      userId: 0
    };
  },

  componentDidMount: function () {
    fadeIn(this, 1000);

    if (this.state.loggedIn) {
      var self = this;
      jQuery.ajax({
        url: '/auth/user',
        dataType: 'json'
      }).done(function (data) {
        self.setState({userId: data.id});
      });
    }
  },

  handleLogginButton: function () {
    Portal.showModal("#log-in");
  },

  handleRegisterButton: function () {
    Portal.openSignupModal();
  },

  renderLoggedIn: function () {
    var prefsUrl = this.state.userId ? "/users/" + this.state.userId + "/preferences" : "#";
    return div({},
      div({}, "Welcome " + Portal.currentUser.firstName + " " + Portal.currentUser.lastName),
      div({},
        a({href: "/help", target: "_blank"}, "Help"),
        " | ",
        a({href: prefsUrl}, "My Preferences"),
        " | ",
        a({href: "/users/sign_out"}, "Logout")
      )
    );
  },

  renderLoggedOut: function () {
    return div({style: {opacity: this.state.opacity}},
      button({className: "stem-auth-login-button", onClick: this.handleLogginButton}, "Log In"),
      button({className: "stem-auth-register-button", onClick: this.handleRegisterButton}, "Register")
    );
  },

  render: function () {
    return this.state.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut();
  }
});

var StemFinder = Component({
  getInitialState: function () {
    return {
      opacity: 0,
      subjectAreas: [
        {id: 1, title: "Physics & Chemistry", areas: ["Chemistry", "Physics"]},
        {id: 2, title: "Life Science", areas: ["Biology"]},
        {id: 3, title: "Engineering & Tech", areas: ["Engineering"]},
        {id: 4, title: "Earth & Space", areas: ["Earth and Space Science"]},
        {id: 5, title: "Mathematics", areas: ["Mathematics"]}
      ],
      featureFilters: [
        {id: 1, title: "Sequence", feature: "sequence"},
        {id: 2, title: "Model", feature: "model"},
        {id: 3, title: "Browser-Based", feature: "browser-based"},
        {id: 4, title: "Activity", feature: "activity"},
        {id: 5, title: "Sensor-Based", feature: "sensor-based"},
      ],
      gradeFilters: [
        {id: 1, title: "Elementary", grades: ["K", 1, 2, 3, 4, 5], label: "K-5"},
        {id: 2, title: "Middle School", grades: [6, 7, 8], label: "6-8"},
        {id: 3, title: "High School", grades: [9, 10, 11, 12], label: "9-12"},
        {id: 4, title: "University", grades: ["Higher Ed"], label: "University"},
        {id: 5, title: "Informal Learning", grades: [], label: "Informal Learning"},
      ],
      subjectAreasSelected: [],
      featureFiltersSelected: [],
      gradeFiltersSelected: [],
      resources: [],
      numTotalResources: 0,
      loadedResources: false,
      showAllResources: false
    };
  },

  componentDidMount: function () {
    this.loadResources();
  },

  loadResources: function () {
    // ajax call here to new endpoint to get initial list of 6, faking data for now
    this.fakeResources = [];
    var i;

    for (i = 0; i < fakeResourceIconUrls.length; i++) {
      this.fakeResources.push({
        name: lorem(2, 6),
        description: lorem(10, 60),
        icon_url: fakeResourceIconUrls[i],
        subject_areas: randomSubset(["Chemistry", "Physics", "Biology", "Engineering", "Earth and Space Science", "Mathematics"]),
        grades: randomSubset(["K", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "Higher Ed"]),
        features: randomSubset(["sequence", "model", "browser-based", "activity", "sensor-based"])
      });
    }

    this.setState({
      loadedResources: true,
      numTotalResources: this.fakeResources.length,
      resources: this.fakeResources.slice(0, 6)
    });

    fadeIn(this, 1000);

    // another fake ajax call to get all of the resources
    setTimeout(function () {
      this.setState({
        resources: this.fakeResources
      });
    }.bind(this), 1000);
  },

  search: function (e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    var keyword = this.refs.keyword.value || "";
  },

  renderLogo: function (subjectArea) {
    var size = 40;
    var selected = this.state.subjectAreasSelected.indexOf(subjectArea) !== -1;
    var clicked = function () {
      var subjectAreasSelected = this.state.subjectAreasSelected.slice();
      var index = subjectAreasSelected.indexOf(subjectArea);
      if (index === -1) {
        subjectAreasSelected.push(subjectArea);
      }
      else {
        subjectAreasSelected.splice(index, 1);
      }
      this.setState({subjectAreasSelected: subjectAreasSelected});
      this.search();
    }.bind(this);
    return div({key: subjectArea.id, className: "stem-finder-form-subject-areas-logo", onClick: clicked},
      svg({height: size * 2, width: size * 2},
        circle({cx: size, cy: size, r: size, fill: selected ? "#0592AF" : "#fff"}),
        text({x: size, y: size + 5, textAnchor: "middle", fill: selected ? "#fff" : "#000"}, "Icon Here")
      ),
      div({className: "stem-finder-form-subject-areas-logo-label"}, subjectArea.title)
    );
  },

  renderSubjectAreas: function () {
    return div({className: "stem-finder-form-subject-areas"},
      this.state.subjectAreas.map(function (subjectArea) {
        return this.renderLogo(subjectArea);
      }.bind(this))
    );
  },

  renderFilters: function (type, title) {
    return div({className: "stem-finder-form-filters"},
      div({className: "stem-finder-form-filters-title"}, title),
      div({className: "stem-finder-form-filters-options"},
        this.state[type].map(function (filter) {
          var selectedKey = type + "Selected";
          var handleChange = function () {
            var selectedFilters = this.state[selectedKey].slice();
            var index = selectedFilters.indexOf(filter);
            if (index === -1) {
              selectedFilters.push(filter);
            }
            else {
              selectedFilters.splice(index, 1);
            }
            var state = {};
            state[selectedKey] = selectedFilters;
            this.setState(state);
            this.search();
          }.bind(this);
          var checked = this.state[selectedKey].indexOf(filter) !== -1;
          return div({key: filter.id, className: "stem-finder-form-filters-option"},
            input({type: "checkbox", onChange: handleChange, checked: checked}),
            span({}, filter.title)
          );
        }.bind(this))
      )
    );
  },

  renderSearch: function () {
    return div({className: "stem-finder-form-search"},
      div({className: "stem-finder-form-search-title"}, "Search by keyword:"),
      form({onSubmit: this.filter},
        input({ref: "keyword", placeholder: "Type search term here"})
      )
    );
  },

  renderForm: function () {
    return div({className: "stem-finder-form"},
      div({className: "stem-finder-form-inner", style: {opacity: this.state.opacity}},
        this.renderSubjectAreas(),
        this.renderFilters("featureFilters", "Filter by Feature:"),
        this.renderFilters("gradeFilters", "Filter by Grade:"),
        this.renderSearch()
      )
    );
  },

  renderResultsHeader: function () {
    return div({className: "stem-finder-header"},
      div({className: "stem-finder-header-resource-count"},
        "Found ",
        span({}, this.state.numTotalResources + " Resources:")
      )
    );
  },

  renderLoadMore: function () {
    var handleLoadAll = function () {
      this.setState({showAllResources: true});
    }.bind(this);
    if ((this.state.resources.length === 0) || this.state.showAllResources) {
      return null;
    }
    return div({className: "stem-finder-load-all", onClick: handleLoadAll},
      button({}, "Load More")
    );
  },

  renderResults: function () {
    if (this.state.resources.length === 0) {
      return null;
    }
    var resources = this.state.showAllResources ? this.state.resources : this.state.resources.slice(0, 6);
    return div({className: "stem-finder-results", style: {opacity: this.state.opacity}},
      div({className: "stem-finder-results-inner"},
        this.renderResultsHeader(),
        resources.map(function (resource, index) {
          return StemFinderResult({key: index, resource: resource, gradeFilters: this.state.gradeFilters});
        }.bind(this)),
        this.renderLoadMore()
      )
    );
  },

  render: function () {
    return div({},
      this.renderForm(),
      this.renderResults()
    );
  }
});

var StemFinderResult = Component({
  getInitialState: function () {
    return {
      hovering: false,
      favorited: this.props.resource.favorited
    };
  },

  handleMouseOver: function () {
    this.setState({hovering: true});
  },

  handleMouseOut: function () {
    this.setState({hovering: false});
  },

  renderGradeLevels: function (resource) {
    var levels = this.props.gradeFilters.reduce(function (levelAcc, gradeFilter) {
      var matching = gradeFilter.grades.reduce(function (matchingAcc, grade) {
        if (resource.grades.indexOf(grade) !== -1) {
          matchingAcc.push(grade);
        }
        return matchingAcc;
      }, []);
      if (matching.length > 0) {
        levelAcc.push(gradeFilter.label);
      }
      return levelAcc;
    }, []);

    if (levels.length === 0) {
      levels = ["Informal Learning"];
    }

    return div({className: "stem-finder-result-grade-levels"},
      levels.map(function (level, index) {
        return div({key: index, className: "stem-finder-result-grade-level"}, level);
      })
    );
  },

  toggleFavorite: function () {
    // TODO: do api call to favorite resource
    this.props.resource.favorited = !this.props.resource.favorited;
    this.setState({favorited: this.props.resource.favorited});
  },

  renderFavoriteStar: function () {
    var active = this.state.favorited ? " stem-finder-result-favorite-active" : "";
    return div({className: "stem-finder-result-favorite" + active, dangerouslySetInnerHTML: {__html: "&#128970;"}, onClick: this.toggleFavorite});
  },

  render: function () {
    var resource = this.props.resource;
    var options = {className: "stem-finder-result", onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut};

    if (this.state.hovering) {
      return div(options,
        div({className: "stem-finder-result-description"}, resource.description),
        this.renderGradeLevels(resource),
        this.renderFavoriteStar()
      );
    }
    return div(options,
      img({alt: resource.name, src: resource.icon_url}),
      div({className: "stem-finder-result-name"}, resource.name),
      this.renderGradeLevels(resource),
      this.renderFavoriteStar()
    );
  }
});

var CollectionCards = Component({
  getInitialState: function () {
    return {
      opacity: 0,
      collections: []
    };
  },

  componentDidMount: function () {
    jQuery.ajax({
      url: "/api/v1/projects",
      dataType: "json"
    }).done(function (data) {
      var collections = data.reduce(function (collections, collection) {
        if (collection.public && collection.landing_page_slug) {
          collections.push(collection);
        }
        return collections;
      }, []);
      this.setState({collections: shuffleArray(collections).slice(0, 3)});
      fadeIn(this, 1000);
    }.bind(this));
  },

  render: function () {
    if (this.state.collections.length === 0) {
      return null;
    }
    return div({style: {opacity: this.state.opacity}},
      this.state.collections.map(function (collection) {
        return div({key: collection.landing_page_slug, className: "stem-collections-card"},
          a({href: "/" + collection.landing_page_slug},
            img({alt: collection.name, src: collection.project_card_image_url}),
            div({className: "stem-collections-card-name"}, collection.name),
            div({className: "stem-collections-card-description"}, collection.project_card_description)
          )
        );
      })
    );
  }
});


ReactDOM.render(UserAuth({}), document.getElementById('stem-nav-auth'));
ReactDOM.render(StemFinder({}), document.getElementById('stem-finder'));
ReactDOM.render(CollectionCards({}), document.getElementById('stem-collections-cards'));