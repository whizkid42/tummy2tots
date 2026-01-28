/* =========================
   CONFIG
========================= */
const WHATSAPP_NUMBER = "916364537582";
const LOCATION_BANGALORE = "bangalore";
const LOCATION_OUTSTATION = "outstation";

const TERMS = {
  bangalore: `
    <div class="terms-highlight">
      ₹3,000 security deposit • 24-hour rental • Damage charged at actual gown price
    </div>
    <ul>
      <li>Security deposit of ₹3,000 per gown is required before dispatch.</li>
      <li>Please confirm once the gown is received.</li>
      <li>Travel charges must be borne by the customer.</li>
      <li>Gown must be returned within 24 hours of pickup.</li>
      <li>Extended usage will incur extra charges.</li>
      <li>If booked by us, travel expenses will be deducted from the deposit.</li>
      <li>Damaged, dirty, or lost gowns will be charged at actual price.</li>
      <li>Cancellation allowed only before dispatch with ₹200 deduction.</li>
      <li>Inform us if using smoke, fog, beach, or special setups.</li>
      <li>Please make an unboxing video for safety.</li>
    </ul>
    <p><em>Disclaimer: Minor marks may exist due to photoshoot usage but will not appear in photographs.</em></p>
  `,
  outstation: `
    <div class="terms-highlight">
      ₹3,000 security deposit • 24-hour rental • Damage charged at actual gown price
    </div>
    <ul>
      <li>Security deposit of ₹3,000 per gown is required before dispatch.</li>
      <li>Please confirm once the gown is received.</li>
      <li>Return Travel charges must be borne by the customer.</li>
      <li>Gown must be returned on the next day after shoot(Please share courier receipt/tracking number).</li>
      <li>Extended usage will incur extra charges.</li>
      <li>If booked by us, travel expenses will be deducted from the deposit.</li>
      <li>Damaged, dirty, or lost gowns will be charged at actual price.</li>
      <li>Cancellation allowed only before dispatch with ₹200 deduction.</li>
      <li>Inform us if using smoke, fog, beach, or special setups.</li>
      <li>Please make an unboxing video for safety.</li>
    </ul>
    <p><em>Disclaimer: Minor marks may exist due to photoshoot usage but will not appear in photographs.</em></p>
  `
};



/* =========================
   STATE
========================= */
let userLocation = null;
let pendingAction = null;
let pendingGown = null;
let galleryImages = [];
let currentImageIndex = 0;


/* =========================
   GOWN DATA 
========================= */
const gowns = [
  //ONLY IN OUTSTATION
  { name: "CRYSTAL THREAD", images: ["https://lh3.googleusercontent.com/d/1lEP_uy8PyZkChfJ-x2p3PRgBkJck9ANy",
    "https://lh3.googleusercontent.com/d/1h5RkqqNPz-sduz7bXJ97WrbP-P5bBQYf"], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 0 },
  { name: "SHIMMER PINK", images: ["https://lh3.googleusercontent.com/d/138HLlDDCZscmERC2ZMk2u1lJoVnn9VCS",
    "https://lh3.googleusercontent.com/d/15GlD-x1F6kG04hD9hTMTwVVWWTRryF2y"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 0 },
  { name: "VIOLET PINK", images: ["https://lh3.googleusercontent.com/d/1URTO4P4bZAgK81O2b2T42-hYncTOnMt1"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 0 },
  
  //{ name: "BABY PEACH WRAPPING CLOTH", images: [], rentBangalore: 800, rentOutstation: 1300, buyPrice: 0 },
  
  { name: "ROSY SKY BLUE", images: ["https://lh3.googleusercontent.com/d/1znI_LOTVTZ53SbsqXc5dWWiD-uBpfrcQ"], rentBangalore: 1200, rentOutstation: 1700, buyPrice: 0 },
  { name: "BOLD BLACK", images: ["https://lh3.googleusercontent.com/d/1Wc0WjBJSdVTBPYGY3V5b9znloiSY6w3x",
    "https://lh3.googleusercontent.com/d/1mg1We8zVltnJMHaQ8XBvxpcMDdt1LZrm"], rentBangalore: 800, rentOutstation: 1300, buyPrice: 0 },
  { name: "WHITE PERAL DUO", images: ["https://lh3.googleusercontent.com/d/1-WcVaN1UwutbZjl9p6_ASCikCo8rJmPr",
    "https://lh3.googleusercontent.com/d/1LAOChq_5n7aKSD3losCrKrWflEcSQm0f"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 0 },
  
  // END HERE
  { name: "CICILIA", images: ["https://lh3.googleusercontent.com/d/1g5Z5l68PUkOKcKKO0WBbLtNuEwWWtb9K",
    "https://lh3.googleusercontent.com/d/1HFtk6lArnw75DU3n_IM0Yt3XKqQGjCwu"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "PEARL BLOSSOM", images: ["https://lh3.googleusercontent.com/d/1AmNdzdR0mugLq7w57xC5Nbqr5MJ-Vp9I",
    "https://lh3.googleusercontent.com/d/1oaqSAlbaX07qX6-g5qoFD4zrR0kn_e9l"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 11200 },
  { name: "FLORIDA", images: ["https://lh3.googleusercontent.com/d/1J1sPBoPfYZiM1D60njD9DFAZ-Et4Amgz",
    "https://lh3.googleusercontent.com/d/1Aj2HYp1WDLuValAVtQjxflocntM0z7SK"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "WHITE DREAM", images: ["https://lh3.googleusercontent.com/d/1hT40nZRaNUgdh5M6W9w19ZxiZLizsiMC",
    "https://lh3.googleusercontent.com/d/1i7b6sEayD_5OQti-D16xLKYJ8-sx95d2"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 5500 },
  { name: "SKY ELEGANCE", images: ["https://lh3.googleusercontent.com/d/1Ax-fNzin10Kc4ZxSshMb7ZxLsODxndCV",
    "https://lh3.googleusercontent.com/d/1ppIFZQCQmebCiwIWu3R93bNq1T1wwOaB"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 5000 },
  { name: "CHERRY ROSE", images: ["https://lh3.googleusercontent.com/d/1AD5G25J6se0NpMythQftBDV-6YJ_UK3O",
    "https://lh3.googleusercontent.com/d/1QOgC9x3ke3K2c553xEp8oqrnK1LDhPQ1"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  
  { name: "INDIGO", images: ["https://lh3.googleusercontent.com/d/19TaSosYoInoYCcQnvp-yImfaW4d5qC4z",
    "https://lh3.googleusercontent.com/d/18Lvhn554Hl1Z1CuFdrbtSUWwhDTbGEXu"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 10000 },
  { name: "CREAMY PEARL", images: ["https://lh3.googleusercontent.com/d/1uX5tJSOdimc_afEMR0lWUM-pNCqbid1-",
    "https://lh3.googleusercontent.com/d/1sAHIH8gC8AX_EU8CtylA3me29CmAikUr"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "GREEN GLOW", images: ["https://lh3.googleusercontent.com/d/1vmAiIaDhiNxIQcmd6irhAWtNKWRSAJ_q",
    "https://lh3.googleusercontent.com/d/1IHI0XKLDaLLjsvBryCCvJZRKRmGOcFqm"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "MOCHA MAGIC", images: ["https://lh3.googleusercontent.com/d/1BQWr1cFKKOYjKqDsduWCmjObm2RBQATp",
    "https://lh3.googleusercontent.com/d/15z7XP3axms6ih756BrGgO9goZ9Awx3qp"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 6000 },
  { name: "AURORA", images: ["https://lh3.googleusercontent.com/d/1I-uyN8DvCB4ggLzxwihDtl4eKM6LvZLK",
    "https://lh3.googleusercontent.com/d/12n5cKxMZOqcLC4ObEpcsnw2ZSIymbwG9"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 10000 },
  { name: "CARAMEL LUX", images: ["https://lh3.googleusercontent.com/d/1_SuGgDYuSDw9h5ZTXVypzWdfY9q2SKAh",
    "https://lh3.googleusercontent.com/d/1zkaB1rbC95-pJh19ITLwqXP6I7csM1t_"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 10000 },
  { name: "GRACY", images: ["https://lh3.googleusercontent.com/d/1_577x7jD1PWQrBmBZj-kM4rpi_JQ372b",
    "https://lh3.googleusercontent.com/d/1x-rK42Nvo3SOPkpzNWnfxiHS4deT_IEx"], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 15000 },
  { name: "RED VELVET", images: ["https://lh3.googleusercontent.com/d/1_0qQVcmKBLwa4Ztn8WUOiimxC213Uwiw",
    "https://lh3.googleusercontent.com/d/14mmrjvAZe9me6PRF4CtRwUAfIt_l9DXr"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 9000 },
  { name: "BLACK VELVET", images: ["https://lh3.googleusercontent.com/d/1AhDR_0B3wkkzThW7r5iQgvuTzDuLFFFa",
    "https://lh3.googleusercontent.com/d/1jXYAUnbhs5dOBb_Zdpl80o0LSdKj6yLD"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 5000 },
  { name: "WINCY", images: ["https://lh3.googleusercontent.com/d/1FlV5ZrlmqeGtqscezcHWYJmNF6by8A5n",
    "https://lh3.googleusercontent.com/d/1Mi6l9b4-1YIczrvR8KSfPxz4rtp1aUIM"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 5000 },
  { name: "TULIP", images: ["https://lh3.googleusercontent.com/d/1WiyaglQpGU3jBaOBNwSyDCbB0xLkKdyz",
    "https://lh3.googleusercontent.com/d/1bIGQhhxqhr3mZhLNRyNvRmmT7Au6VBcp"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "ROSY RED", images: ["https://lh3.googleusercontent.com/d/1n37iXvcY2dIdODAaisrevXViH0b81vsA",
    "https://lh3.googleusercontent.com/d/1szXO7gWc3qHCKRCiPw1MMEcZwLcLAPjD"], rentBangalore: 800, rentOutstation: 1300, buyPrice: 3500 },
  { name: "SUNFLOWER", images: ["https://lh3.googleusercontent.com/d/1odesR27so00An8kMYP8BUeZTiACIiWDx",
    "https://lh3.googleusercontent.com/d/1zw5p8k3Wprs_TdSoOuaUFFoQ4N_v8hQ2"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "BLACK BLISS", images: ["https://lh3.googleusercontent.com/d/1JzexilNEQGyrNRPQ7nnX66xL_Q23Ct4I",
    "https://lh3.googleusercontent.com/d/1Xfpk4BKIvNseaI5UP4BleNm-JxXvERkL"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7000 },
  { name: "ELENA", images: ["https://lh3.googleusercontent.com/d/1SQXuo7u5IN0VxRRfqh1TICZm4FFSD-7o",
    "https://lh3.googleusercontent.com/d/1nCAJcYNhusTFSBFsXTde0pP2eY3A98m4"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "BOLD RED", images: ["https://lh3.googleusercontent.com/d/1i5iwMDZFIXkfjNZWv-eKCpMtLS6CR6qv",
    "https://lh3.googleusercontent.com/d/1RsUMrb-IFYHHvcR4-JBAje5QpKs7X6-l"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 4500 },
  { name: "PIHU PEACH", images: ["https://lh3.googleusercontent.com/d/1mFi36eRB45at7GkLuEBE1pN4rC323Lex",
    "https://lh3.googleusercontent.com/d/1YMQt2AZoP2OwZJvjQKcmAeHTW3ePJrK0"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "GREEN GLORY", images: ["https://lh3.googleusercontent.com/d/1whI4eP7kVFyGoe4iVjYw7ahZdGLwedF3",
    "https://lh3.googleusercontent.com/d/1hd5Fmofo1-c_9akAO0M1DC9R03tcb7Ff"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "MEHNDI GREEN", images: ["https://lh3.googleusercontent.com/d/1o77V7_c5BQoheNny9Cm96s0NYNEVaS14",
    "https://lh3.googleusercontent.com/d/1JCw8ns_DKOAR9sl1AfCKFw6snlxiyYUK"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7500 },
  { name: "VIOLET TWILIGHT", images: ["https://lh3.googleusercontent.com/d/1EpqA-I1ROHqA3IlFm6eBTwBRMf4Uhurh",
    "https://lh3.googleusercontent.com/d/1ooCJzubPQu9wkeYoEHbbrIEFA05k2gQB"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 14000 },
  { name: "SERENE GLOW", images: ["https://lh3.googleusercontent.com/d/16zCglgAPvM92j0umdW7quq-LuBAU5qaW",
    "https://lh3.googleusercontent.com/d/1rxkaUZopAZ_9W76qPw07nHYAJZJa9nVk"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 6000 },
  { name: "OCEAN BREEZE", images: ["https://lh3.googleusercontent.com/d/12mjXhR7W7NCdz7aWh-naKnabV06HIEJa",
    "https://lh3.googleusercontent.com/d/1m74NFjt-8vuixPA1jfUrTMpzbEs7aTor"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "AZURE DREAM", images: ["https://lh3.googleusercontent.com/d/1ZtTsvnAQ0K7l1h0WcPW8H53sVS4pCJht",
    "https://lh3.googleusercontent.com/d/1QjwyUBABHucGRYVOsfG75Aiu5lNfsmXM"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "PEACH BLOSSOM", images: ["https://lh3.googleusercontent.com/d/1zyENM2v8P1eN-HoU_wY0OUIvytoYYMg5",
    "https://lh3.googleusercontent.com/d/1Ayt9s95mjHBJFnAr-zrQAWuxpWldV9f_"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "COCO BREEZE", images: ["https://lh3.googleusercontent.com/d/1Q14fj74_BqpOb4Gk7zu8ocpVnTv78to1",
    "https://lh3.googleusercontent.com/d/1OkRrAy5qSGMAlzSoOlxW0jS8usXyJ8u_"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "PINK DELIGHT", images: ["https://lh3.googleusercontent.com/d/1h4_44x0hvIaB_FGGmfgqDA7xDtjhWdUp",
    "https://lh3.googleusercontent.com/d/1kOauBQZwauO9qL-ov6oaQNCx2wDd75n0"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "BOHO WHITE", images: ["https://lh3.googleusercontent.com/d/11M5wzWH3UKmjZ2DvVuZhps7rM68n91xr",
    "https://lh3.googleusercontent.com/d/1qaRTaT3Ty8gDYM96z3h3E_t2wjuKwW3J",
    "https://lh3.googleusercontent.com/d/1NbK26xAlfZKp3vPz4H-NL6CE3Y7dSCWO"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "MISTY BLUE", images: ["https://lh3.googleusercontent.com/d/1DTzkwJH2HhXGSflLr6gSyNC6ZVWX1PgO",
    "https://lh3.googleusercontent.com/d/1q1RdDYN_9q6ocb-u3ohVNIQdOjOUHYCn"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "CARNATION PINK", images: ["https://lh3.googleusercontent.com/d/1tIRsAOfQ_0Q5zAjpH5KJcAB92E5G5K34",
    "https://lh3.googleusercontent.com/d/1Viu0mZ4a1eB8e43OzcLWOT3AtswVftXe",
    "https://lh3.googleusercontent.com/d/12dVHjMVrRRnN8AU_wz8eQ0I4TMRqopy5"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 9000 },
  //{ name: "GRAPE WINE", images: [], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 8000 },
  { name: "BLACK BEAUTY", images: ["https://lh3.googleusercontent.com/d/1EahSHTVJmLj35N9ypXyOpI3ctxm33CQk",
    "https://lh3.googleusercontent.com/d/1816tutYy4Jx7UHWLVHmsXslREExocLP6",
    "https://lh3.googleusercontent.com/d/1k9I5LZEivKAGIq4WH-v21nz8sdnqAGNf",
    "https://lh3.googleusercontent.com/d/1VzbJP16ifVhddr7e-_8e6LKNliXeJsY8"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 5500 },
  
  { name: "DARK CHOCOLATE", images: ["https://lh3.googleusercontent.com/d/1qda66XVeBeUA37HqACmamqR2DTEhzZKt",
    "https://lh3.googleusercontent.com/d/1oF-RuE9dIKq1nSz89lAkyeZ5i-pMZkkB"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "VIOLET PAPER", images: ["https://lh3.googleusercontent.com/d/1LTbyVK9PQR4_9oBYSDdZLGiL0FtWmc-f",
    "https://lh3.googleusercontent.com/d/11CoyQB9WxRRvd8SLIXbEI4f1SA60p6h5"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7000 },
  
  { name: "SNOW WHITE", images: ["https://lh3.googleusercontent.com/d/11hf_MF064PiMMYl-MZn2Q6VYwWVcZCvG",
    "https://lh3.googleusercontent.com/d/185EHGv_nK1CqWYFCtHEn8UQwTy8lk4H0"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7000 },
  { name: "PINK PEARL", images: ["https://lh3.googleusercontent.com/d/1vT8D2ZdPvGqDXWf-1D8zvp9kwGljKAdx",
    "https://lh3.googleusercontent.com/d/1j_2SAmTtmywaiPFn5wry6WbZjDLuGu7d"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  
  { name: "WHITE PEARL", images: ["https://lh3.googleusercontent.com/d/1-k1ylIvdCFOrlXsqtnVty6DANxgsten7",
    "https://lh3.googleusercontent.com/d/1IMNqlXchp5T8jPLca5vO4hS1FFqvGY2q"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7000 },
  { name: "WHITE MARBLE", images: ["https://lh3.googleusercontent.com/d/10uU52tdD4Gb7dG3qR4j0vWCVIBpJd5Oi",
    "https://lh3.googleusercontent.com/d/13UGkXAZkaW9W3eKk9GDujD9ua7kH6bAA"], rentBangalore: 800, rentOutstation: 1300, buyPrice: 4000 },
  { name: "MANGO YELLOW", images: ["https://lh3.googleusercontent.com/d/10c6F8ajsD5ISBqp2I3pQ2NRM4uYTgQNx",
    "https://lh3.googleusercontent.com/d/1jFhhOrWclZMEHKrU6ja0un4xcyJwNZ8l"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  
  { name: "LACY BLACK", images: ["https://lh3.googleusercontent.com/d/1H_6c6SZQmIUGcy-p5HqCsCzzyWemDR0x",
    "https://lh3.googleusercontent.com/d/15xyiu4FUYMv0mSV2RymWj2xC-J9tnkFj"], rentBangalore: 1200, rentOutstation: 1700, buyPrice: 6500 },
  { name: "DAHLIA", images: ["https://lh3.googleusercontent.com/d/1PfkwUa9DfrwAEjg9FIkgjpv-_Kn7aVjH",
    "https://lh3.googleusercontent.com/d/1js_haRH8NAA6K4A7yxx-WvhIOvaRK3I6"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "LOVELY LAVENDER", images: ["https://lh3.googleusercontent.com/d/1sFHZo42Z4x6azJY1u6xkJitYlsT2M6c-",
    "https://lh3.googleusercontent.com/d/1YbhJX-nCu5OCoiJJ8qlCxELHq4j-oQlf"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 9000 },
  { name: "FLAKY SNOW", images: ["https://lh3.googleusercontent.com/d/1PJWbp7ySxiyw_J8R6e-91gl-ng9ksOXn",
    "https://lh3.googleusercontent.com/d/1H8ojLpO8kVQiSdP8leoOasDg7h7KAsrw"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 9500 },
  { name: "DUSTY DAFFODILS", images: ["https://lh3.googleusercontent.com/d/1tSfuH1BoqgGl6stXlbkiTR6HOzmJtWoo",
    "https://lh3.googleusercontent.com/d/1-XR4iJYokyRnF8QqILmtKjDru9WiinWK"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "BLUE BUSH", images: ["https://lh3.googleusercontent.com/d/1gBxg3DVJy71ogYwIm8ZNt8iLyrfrspB_",
    "https://lh3.googleusercontent.com/d/1YRKF43Lau50OvZVm3ZdTl3Km8R-N9dyP"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "CHERRY BLOSSOM", images: ["https://lh3.googleusercontent.com/d/13WZOaZW72IE201jCUsbc_IuURtCFHR_Y",
    "https://lh3.googleusercontent.com/d/1Jw50CPw-i8Op4Xti7M7n9FHr317-aRHV"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 9000 },
  { name: "BLOSSOMY BLISS", images: ["https://lh3.googleusercontent.com/d/1GhtI65-zrC-X1o7TDuOgfW0Soa1aF_RQ",
    "https://lh3.googleusercontent.com/d/1IfZG3Cc0U9FFj4G1DCgVD_3wQPJKZ4q_"], rentBangalore: 1500, rentOutstation: 2300, buyPrice: 9000 },
  { name: "BLURRY NIGHT", images: ["https://lh3.googleusercontent.com/d/114ImWfIvN4USIZhmvnAzvY07eRcTpqp3",
    "https://lh3.googleusercontent.com/d/1xxrwTc8q3LvxFcebnHVmcewKwzUP62iW"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "HYDRA", images: ["https://lh3.googleusercontent.com/d/1F4F2xT0eaHye8f2RMwXZVpkRQ-pKIU8O",
    "https://lh3.googleusercontent.com/d/1jrxTLIeOO2CDxFidBphrukgbkaGVPJ50"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "FURY BEIGE", images: ["https://lh3.googleusercontent.com/d/1dolxHk2xnuP4rmcfwKvVhpJav4d-uqxT",
    "https://lh3.googleusercontent.com/d/1yqLPpump2jMLilw50rRkVrGTaKtDmAij"], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 13000 },
  { name: "WHITE LILY", images: ["https://lh3.googleusercontent.com/d/1iXD-RXflzuuOJtMvXjyi09tgpycQE7iJ",
    "https://lh3.googleusercontent.com/d/1SvfArMHPrTpi6bDAF1Cv2TAz_cM4MAl2"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 8200 },
  { name: "CAMILLE", images: ["https://lh3.googleusercontent.com/d/1gPMiWWG_5kKPhw_E-0dj4Cl4OH5DLeYN",
    "https://lh3.googleusercontent.com/d/1SGpV9d2cui6A0zb0yOTAcIldmiTB93WC"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "MIDNIGHT", images: ["https://lh3.googleusercontent.com/d/1diadux0QeK4R0eTtabIrnCWaB0Ggps4w",
    "https://lh3.googleusercontent.com/d/1GkI45bmDNFjQWT2aQfn1E8za7hvgiRTG"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 14000 },
  { name: "BLUE LILLY", images: ["https://lh3.googleusercontent.com/d/1skGrAvbGDEpiGKpjoZJysigGzdqwvnX6",
    "https://lh3.googleusercontent.com/d/1uY0Pgw7q_2vbbgK4J6kTywdWC_5sxEgy"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 9000 },
  { name: "BLUE BELL", images: ["https://lh3.googleusercontent.com/d/16BjotxsxPGf1KEJUlRKBvTSvPD8cdXv1",
    "https://lh3.googleusercontent.com/d/1UnYj1MPhbgGdIRMFhYdLq3A3oGE4Go8r"], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 10000 },
  { name: "SKY LILLY", images: ["https://lh3.googleusercontent.com/d/1zkFRTWi5e4Xah7_o2UIrH2MiN7-E7UcI",
    "https://lh3.googleusercontent.com/d/1hDOf7fGOR2e9hnyRMptusagy90z-n0Al"], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 18000 },
  { name: "PRINTED NET", images: ["https://lh3.googleusercontent.com/d/1tW9UP7jKqs1rpkIGx6bTy1KkmVkKqE8D"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 4000 },
  { name: "GOLD BLACK", images: ["https://lh3.googleusercontent.com/d/1EQvfVVfgjpiPGWtXjW34xd5lZ-mpOm97"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7500 },
  { name: "WINE WONDER", images: ["https://lh3.googleusercontent.com/d/1DmDxdfh6bVzpGG-tgSngouLv41yg9fGP"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "LILAC FLAIRY", images: ["https://lh3.googleusercontent.com/d/1l_ZCV1CBOlKW8hMpCfWjl94kRrd_NtpK",
    "https://lh3.googleusercontent.com/d/1pxNBsT4PFxzOlu8New3-qT6a9FFRAu9S"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "LACY RED", images: ["https://lh3.googleusercontent.com/d/1zjjNc14uqpjl1l5AZiPBZwD0hNM1YBUp",
    "https://lh3.googleusercontent.com/d/1ATkQv_KyCY_on5-v2cOkhOn8r-Fuy2nm"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 4500 },
  { name: "GOLDEN SHOWER", images: ["https://lh3.googleusercontent.com/d/1QUQJd8fIFv1hjRlUaBGt-H1ar0ur2R7d",
    "https://lh3.googleusercontent.com/d/1iGyESjau-i3S_HiIY60chai2hHtJqvDL"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 9000 },
  { name: "DAISY", images: ["https://lh3.googleusercontent.com/d/1lgFtzEsda2uTcl__pA0boW2abXSySxMj",
    "https://lh3.googleusercontent.com/d/1Pxzh5E9iRiKXp7hf67uINUMNNUV6HgJt"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "MARIE GOLD", images: ["https://lh3.googleusercontent.com/d/1PF0AvF0etljlvkpHlb8CUIdljt5_Na-o",
    "https://lh3.googleusercontent.com/d/1lTEnI2UIyORDKb47smfya9ivp1lKbQ26"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 11000 },
  
  { name: "MORNING GLORY", images: ["https://lh3.googleusercontent.com/d/1EXtFgAapb1LkUN6z3q9tTu3OAQ_vvvn-",
    "https://lh3.googleusercontent.com/d/1G_FCn9tw1XjUUHSG6FyBXJOBUjDCP0HF"], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 18000 },
  { name: "PLUMERIA", images: ["https://lh3.googleusercontent.com/d/1ioRR4mQp_JFtvWXtsnF5udPeZjX8IYLk",
    "https://lh3.googleusercontent.com/d/1xGkl0hSWKzdpdfM25ex-PETDfQPmT-i6"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "BARBIE", images: ["https://lh3.googleusercontent.com/d/13prRaMRwMl05zYH1arJ2esaB5snWoYEO",
    "https://lh3.googleusercontent.com/d/11hAewlJeeYB9fFLLdjctYoMjCphrqRk9"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 8000 },
  { name: "CINDERELLA", images: ["https://lh3.googleusercontent.com/d/1um74Wt6fxzjwKfV1VYKhfLKdGWhFQ542",
    "https://lh3.googleusercontent.com/d/1pY4ietJarPgwPZHQ73Y-F0mFKQUF0ikX/view?usp=drive_link"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 11000 },
  { name: "BLACK PEARL", images: ["https://lh3.googleusercontent.com/d/1qK6h1fuGhyyiRgqg3sTfy1jRl2dgH3fj",
    "https://lh3.googleusercontent.com/d/19Ujw3VrC1PAAJNgAzSsFk6YypnMzjWsy"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 4500 },
  { name: "ONION PINK", images: ["https://lh3.googleusercontent.com/d/1sN-50TchdoVKzYvsYcDu_YPNmnGl2_b1",
    "https://lh3.googleusercontent.com/d/1hEYZ8kjQNQyNPl9D5MrMud7GNgow0Taa"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7500 },
  
  
  { name: "WHITE DRAPE", images: ["https://lh3.googleusercontent.com/d/1-x91pMm8YWtJ0WO45NZE3QErpFpaGhmK",
    "https://lh3.googleusercontent.com/d/1f_sKdgC9JSjpseu_qqGV67790CHDpNXr"], rentBangalore: 800, rentOutstation: 1300, buyPrice: 2000 },

  

  // ONLY IN SELLING
  // { name: "BRIGHT PEACH", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 7500 },
  // { name: "LACY PINK", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 7000 },
  // { name: "BOTTLE GREEN", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 8000 },
  // { name: "SCARLET", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 15000 },
  // { name: "CHOCOLATE BROWN", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 16000 },
  // { name: "SUPER BLACK", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 16000 },
  // { name: "LEAFY GREEN", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 15000 },
  // { name: "BOHO", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 5000 },
  // { name: "COSMO CARROT", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 13000 },
  // { name: "BLOSSOM PINK", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 8000 },
  // { name: "LIGHT BLUE", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 10000 },
  // { name: "DARK BLUE", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 5000 },
  // { name: "FRILLY PURPLE", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 14000 },
  // { name: "ROYAL BLUE", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 5000 },
  // { name: "PEACOCK BLUE", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 8000 },
  // { name: "HIBISCUS RED", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 8000 },
  // { name: "ANGEL PINK", images: [], rentBangalore: 0, rentOutstation: 0, buyPrice: 7000 }
  
  // END HERE
  
  
];


/* =========================
   LOCATION LOGIC
========================= */
function setLocation(loc) {
  if (loc !== LOCATION_BANGALORE && loc !== LOCATION_OUTSTATION) {
    console.error("Invalid location:", loc);
    return;
  }

  userLocation = loc;

  // Close modal
  document.getElementById("locationModal").style.display = "none";

  // Re-render gowns with new prices
  renderGowns();
}

function openLocationModal() {
  document.getElementById("locationModal").style.display = "flex";
}

/* =========================
   RENDER
========================= */
function renderGowns() {
  const grid = document.getElementById("gownGrid");
  grid.innerHTML = "";

  gowns.forEach(gown => {
    let price;

    if (userLocation === LOCATION_BANGALORE) {
      price = gown.rentBangalore;
    } else if (userLocation === LOCATION_OUTSTATION) {
      price = gown.rentOutstation;
    } else {
      price = gown.rentBangalore; // safe default
    }


    const card = document.createElement("div");
    card.className = "gown-card";
    card.onclick = () => openGallery(gown.images, gown.name);

    const canRent = gown.rentBangalore > 0 || gown.rentOutstation > 0;
    const canBuy = gown.buyPrice > 0;

    card.innerHTML = `
    <img src="${gown.images[0]}" alt="${gown.name}">
    <div class="gown-content">
      <h4>${gown.name}</h4>

      ${canRent ? `<div class="price">Rent: ₹${price.toLocaleString()}</div>` : ""}

      ${canBuy ? `<div class="price">Buy: ₹${gown.buyPrice.toLocaleString()}</div>` : ""}

      <div class="actions">
        ${canRent
          ? `<button class="rent" onclick="event.stopPropagation(); openConfirm('rent','${gown.name}')">Rent</button>`
          : ""}
        ${canBuy
          ? `<button class="buy" onclick="event.stopPropagation(); openConfirm('buy','${gown.name}')">Buy</button>`
          : ""}
      </div>
    </div>
    `;


    grid.appendChild(card);
  });
}

/* =========================
   WHATSAPP FLOWS
========================= */
function sendRentMessage(name) {
  const msg =
    `Hi tummy2tots,%0AI'm interested in renting the gown: ${name}%0ALocation: ${userLocation}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}

function sendBuyMessage(name) {
  const msg =
    `Hi tummy2tots,%0AI'm interested in buying the gown: ${name}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}

function openConfirm(action, gownName) {
  pendingAction = action;
  pendingGown = gownName;

  document.getElementById("confirmTitle").innerText =
    action === "rent" ? "Rental Interest" : "Purchase Interest";

  document.getElementById("confirmText").innerText =
    `Do you want to ${action} the gown "${gownName}"?`;

  document.getElementById("confirmModal").style.display = "flex";
}

function closeConfirmModal() {
  document.getElementById("confirmModal").style.display = "none";
  pendingAction = null;
  pendingGown = null;
}

function confirmAction() {
  if (pendingAction === "rent") {
    showRentalWarningThenProceed();
  } else if (pendingAction === "buy") {
    sendBuyMessage(pendingGown);
    closeConfirmModal();
  }
}

function showRentalWarningThenProceed() {
  const gownName = pendingGown;
  closeConfirmModal();

  const warning = document.createElement("div");
  warning.className = "modal-overlay";
  warning.innerHTML = `
    <div class="modal">
      <p>Please read the rental terms at the bottom of the website.</p>
      <button id="continueToWhatsApp" class="rent">
         Continue to WhatsApp
      </button>
    </div>
  `;

  document.body.appendChild(warning);

   document
      .getElementById("continueToWhatsApp")
      .addEventListener("click",() => {
         document.body.removeChild(warning);
         sendRentMessage(gownName);
      });
}
  


function openGallery(images, title) {
  galleryImages = images;
  currentImageIndex = 0;

  document.getElementById("galleryTitle").innerText = title;
  document.getElementById("galleryModal").style.display = "flex";

  updateGalleryImage();
}

function updateGalleryImage() {
  document.getElementById("galleryImage").src =
    galleryImages[currentImageIndex];

  document.getElementById("imageCounter").innerText =
    `${currentImageIndex + 1} / ${galleryImages.length}`;
}

function nextImage() {
  currentImageIndex =
    (currentImageIndex + 1) % galleryImages.length;
  updateGalleryImage();
}

function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) %
    galleryImages.length;
  updateGalleryImage();
}

function closeGallery() {
  document.getElementById("galleryModal").style.display = "none";
}

function openTermsModal() {
  document.getElementById("termsModal").style.display = "flex";

  const locationText =
    userLocation === LOCATION_OUTSTATION
      ? "Applicable for: Outstation"
      : "Applicable for: Bangalore";

  document.getElementById("termsLocation").innerText = locationText;
  document.getElementById("termsContent").innerHTML =
    TERMS[userLocation || LOCATION_BANGALORE];
}

function closeTermsModal() {
  document.getElementById("termsModal").style.display = "none";
}

