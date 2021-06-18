const group1 = [
  { x: 1.710651375385257, y: 2.5090000000000003, z: 3.972227444632612 }, // Telaviv

  { x: 4.428914192259828, y: 1.747666666666666, z: -1.5265583185131515 }, // Taipei

  { x: 2.2556385620402715, y: -3.6256666666666666, z: -2.6012758215266443 }, // GoldCost

  { x: -0.3377278405015561, y: 1.2393333333333332, z: -4.832183025780278 }, // Gonolulu

  { x: -3.697382157586577, y: 2.476000000000001, z: -2.3016144726605337 }, // San-diego

  { x: -3.553819771080798, y: 2.718666666666667, z: -2.2314158263826083 }, // Los-Angeles

  { x: -3.266468314656494, y: 3.2126666666666672, z: -2.056907810075653 }, // San-ancisco

  { x: -1.5358207793708558, y: 4.64, z: -1.0543502898243542 }, // Anchorage

  { x: -2.650080023570794, y: 4.046333333333333, z: -1.266594814542747 }, // Vancuver

  { x: -4.310934142420775, y: 2.2713333333333336, z: -1.1211118180626518 }, //  Austin

  { x: -4.358209461381206, y: 2.2706666666666666, z: -0.9219995551063066 }, // Houston

  { x: -4.195660532084914, y: 2.54, z: -0.9720250508628521 }, // fort-worth
];

const group2 = [
  { x: -4.195660532084914, y: 2.54, z: -0.9720250508628521 }, // fort-worth

  { x: -2.979752797046555, y: 3.725333333333334, z: -1.4976531053781394 }, // Portland

  { x: -3.130552505715065, y: 3.655666666666667, z: -1.3548956532454253 }, // Montana

  { x: -3.2614258099910263, y: 3.4399999999999995, z: -1.5904407206571323 }, // Boise

  { x: -3.513931074153918, y: 3.210333333333333, z: -1.5316815253127471 }, // SaltLake

  { x: -3.130552505715065, y: 3.655666666666667, z: -1.3548956532454253 }, // Montana

  { x: -3.4489785996310713, y: 3.578666666666667, z: 0.5456111327454606 }, // Toronto

  // Boston, New York, Rocky Hill
  { x: -3.5465476925958477, y: 3.4319999999999995, z: 0.8021068907216012 },
  { x: -3.522878126581114, y: 3.431666666666666, z: 0.9016615740649209 },
  { x: -3.622940741209172, y: 3.357, z: 0.7777219205389136 },

  { x: -3.625987298300832, y: 3.209333333333333, z: -1.2459517117916716 }, // Boulder

  { x: -4.046106324632884, y: 2.7993333333333337, z: -0.8903687430804499 },
  // Oklahoma

  { x: -3.9230782662039445, y: 3.047333333333333, z: -0.5685213037290788 },
  // Kansas missury

  { x: -3.411406692838146, y: 3.6516666666666664, z: -0.16623757582046553 }, // Mineapolis

  { x: -4.7318518850639215, y: 1.0119999999999998, z: 1.2591400787112663 },
  // Puerto Rico
];

const group3 = [
  { x: -4.7318518850639215, y: 1.0119999999999998, z: 1.2591400787112663 },
  // Puerto Rico

  { x: -4.625882726551621, y: 1.895333333333333, z: 0.09444869372783954 },
  // maiami

  { x: -4.40772000180932, y: 2.358666666666667, z: -0.09325203057089464 },
  // talahasi

  { x: -4.4118565180010485, y: 2.2696666666666667, z: -0.6197864848428749 },
  // new orlean

  { x: -3.7199144834474733, y: 3.2809999999999997, z: 0.6302977358659355 },
  // Philadelphia

  { x: -3.7964824547684, y: 3.2033333333333336, z: 0.5704178522725737 },
  // Baltimore

  { x: -3.8705218117108786, y: 3.1243333333333334, z: 0.5075451972904068 },
  // washington

  { x: -3.8209314973718, y: 3.204, z: 0.36724173563484624 },
  // Morgatown

  { x: -4.215541309840821, y: 2.626333333333333, z: -0.5758339059553107 },
  // oxford

  { x: -4.2557673922922215, y: 2.624333333333333, z: 0.03631058052173312 },
  // Atlanta

  { x: -4.02699085765463, y: 2.9636666666666667, z: 0.00495189407372026 },
  // Nashvile

  { x: -3.834449611507624, y: 3.2056666666666667, z: -0.1438659064242023 },
  // Springfield

  { x: -3.8345176756005266, y: 3.2046666666666668, z: 0.1630513755314223 },
  // Cincinati

  { x: -3.963173378484142, y: 3.045, z: 0.14571126268957862 },
  // frankfort
];

const group4 = [
  { x: -3.9013197001668516, y: 3.1256666666666666, z: 0.09956146834452805 },
  // frankfort

  { x: -3.940802606142463, y: 3.044, z: 0.4518172411725471 },
  // Shortsvile

  { x: -4.02699085765463, y: 2.9636666666666667, z: 0.00495189407372026 },
  // Nashvile

  { x: -4.076350211681477, y: 2.879666666666667, z: 0.30147776139088933 },
  // Winston

  { x: -4.067759852418044, y: 2.8793333333333337, z: 0.40344682253239206 },
  // Darem

  { x: -3.8921245180296387, y: 2.543, z: -1.8397058830564612 },
  // tuson

  { x: -3.7549996031390123, y: 2.717333333333334, z: -1.8751206723785574 },
  // finiks

  // buenos
  { x: -2.4629911462663774, y: -4.218666666666667, z: 1.0660798136016785 },

  // sanpaulo
  { x: -3.016787943834778, y: -3.4416666666666664, z: 2.0134351386346387 }, //

  { x: -0.6419809614203476, y: 4.203333333333333, z: 2.6305606501395657 },
  // Dublin

  { x: -0.5422444292457544, y: 4.203, z: 2.653443419210582 },
  // Manchester

  { x: -0.3790170837588278, y: 4.088000000000001, z: 2.8538749184606798 },
  // London

  { x: -0.14547927697130092, y: 4.145333333333333, z: 2.7919611987861623 },
  // Amsterdam

  { x: -0.02089508947360802, y: 3.633666666666666, z: 3.4345348958471 },
  // Milan

  { x: 1.710651375385257, y: 2.5090000000000003, z: 3.972227444632612 },
  // tel aviv
];

const groups = { group1, group2, group3, group4 };

export default groups;
