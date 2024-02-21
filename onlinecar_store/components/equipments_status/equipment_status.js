
const lightgreen = '#edfdf1';
const lightred = '#ffe0e0';
const lightyellow = '#ffe3c8';



const equip_status_arr = [
    
    {
        status:'Select status',
        status_color:'',
    },
    {
        status:'Accidented',
        status_color:lightred,
        status_marks : 0,
    },
    {
        status:'Damage',
        status_color:lightred,
        status_marks : 0,
    },
    {
        status:'Abscent',
        status_color:lightred,
        status_marks : 0,
    },
    {
        status:'Error',
        status_color:lightred,
        status_marks : 0,
    },
    {
        status:'Repaired',
        status_color:lightyellow,
        status_marks : 0.5,
    },
    {
        status:'Rusted',
        status_color:lightyellow,
        status_marks : 0.5,
    },
    {
        status:'Dirty',
        status_color:lightyellow,
        status_marks : 0.5,
    },
    {
        status:'Seller',
        status_color:lightyellow,
        status_marks : 0.5,
    },
    {
        status:'Working',
        status_color:lightgreen,
        status_marks : 1,
    },
    {
        status:'Present',
        status_color:lightgreen,
        status_marks : 1,
    },
    {
        status:'NO Noise',
        status_color:lightgreen,
        status_marks : 1,
    },
    {
        status:'No Leakage',
        status_color:lightgreen,
        status_marks : 1,
    },
    {
        status:'OK',
        status_color:lightgreen,
        status_marks : 1,
    },
    {
        status:'Smooth',
        status_color:lightgreen,
        status_marks : 1,
    },
    {
        status:'Inspector',
        status_color:lightgreen,
        status_marks : 1,
    },
    {
        status:'Non-Accidented',
        status_color:lightgreen,
        status_marks : 1,
    },
    

];


const dents_scratches_arr=[
    {
        type:'',
        type_name:'Select Faults',
        mark:0
    },
    {
        type:'S',
        type_name:'Small Scratch',
        mark:-0.5
    },
    {
        type:'S1',
        type_name:'Big Scratch',
        mark:-2
    },
    {
        type:'D',
        type_name:'Small Dent',
        mark:-1
    },
    {
        type:'D1',
        type_name:'Big Dent',
        mark:-2
    },
    {
        type:'DD',
        type_name:'Dry Dent',
        mark:-1.5
    },
    {
        type:'P',
        type_name:'Painted',
        mark:0
    },
    // {
    //     type:'LP',
    //     type_name:'Left Panel',
    //     mark:-2
    // },
    // {
    //     type:'RP',
    //     type_name:'Right Panel',
    //     mark:-2
    // },
    // {
    //     type:'LCP',
    //     type_name:'Left c Piller',
    //     mark:-3
    // },
    // {
    //     type:'LBP',
    //     type_name:'Left b Piller',
    //     mark:-3
    // },
    // {
    //     type:'LAP',
    //     type_name:'Left A Piller',
    //     mark:-3
    // },
    // {
    //     type:'LFF',
    //     type_name:'Left Front Fender',
    //     mark:-5
    // },
    // {
    //     type:'LFD',
    //     type_name:'Left Front Door',
    //     mark:-5
    // },
    // {
    //     type:'LRD',
    //     type_name:'Left Rear Door',
    //     mark:-5
    // },
    // {
    //     type:'LBF',
    //     type_name:'Left Back Fender',
    //     mark:-5
    // },
    // {
    //     type:'RCP',
    //     type_name:'Right C Piller',
    //     mark:-3
    // },
    // {
    //     type:'RBP',
    //     type_name:'Right B Piller',
    //     mark:-3
    // },
    // {
    //     type:'RAP',
    //     type_name:'Right A Piller ',
    //     mark:-3
    // },
    // {
    //     type:'RFF',
    //     type_name:'Right Front Fender',
    //     mark:-5
    // },
    // {
    //     type:'RFD',
    //     type_name:'Right Front Door',
    //     mark:-5
    // },
    // {
    //     type:'RRD',
    //     type_name:'Right Rear Door',
    //     mark:-5
    // },
    // {
    //     type:'RBF',
    //     type_name:'Right Back Fender',
    //     mark:-5
    // },
    // {
    //     type:'RDM',
    //     type_name:'Repaint Dicky',
    //     mark:-10
    // },
    // {
    //     type:'RBM',
    //     type_name:'Repaint Bonet',
    //     mark:-14
    // },
]

export {equip_status_arr , dents_scratches_arr} ;