import arcjet,{sheild, detectBot, slidingWindoww} from '@arcjet/node';
import 'dotenv/config';

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        sheild({mode: "LIVE"}),
        detectBot({
            mode:"LIVE",
            allow:[
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        slidingWindoww({
            mode:"LIVE",
            max:100,
            intervel:60
        })
    ]
});

export default aj;