export const fetchUserData = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const fail = Math.random() < .1;

            if (fail) {
                rej("Failed");
            } else {
                const result = { username: 'John Doe', id: 101 };
                res(result);
            }
        }, 1000);
    });
}