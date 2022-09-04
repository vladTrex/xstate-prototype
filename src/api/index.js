function createData(name, location, serialNumber, info) {
    return { name, location, serialNumber, info };
}

const trainInfo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const locations = [
    createData('Berlin', { lat: 52.520008, long: 13.404954 }, 'ZH 2012', trainInfo),
    createData('Munich', { lat: 48.137154, long: 11.576124 }, 'SH 7833', trainInfo),
    createData('Hannover', { lat: 52.373920, long: 9.735603 }, 'SH 7931', trainInfo),
    createData('Rostock', { lat: 54.083336, long: 12.108811 }, 'SH 2231', trainInfo),
    createData('Hamburg', { lat: 53.551086, long: 9.993682 }, 'MR 2229', trainInfo),
    createData('Dortmund', { lat: 51.514244, long: 7.468429 }, 'DM 2229', trainInfo),
    createData('Trier', { lat: 49.750000, long: 6.633333 }, 'DM 2221', trainInfo),
    createData('Saarbrücken', { lat: 49.233334, long: 7.000000 }, 'DR 2229', trainInfo),
];

export const fetchMockedDataV2 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const fail = Math.random() < .1;

            if (fail) {
                rej("Failed");
            } else {
                const result = { locations };
                res(result);
            }
        }, 1000);
    });
}