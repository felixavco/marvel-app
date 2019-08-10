export const url = (urlpath, query = '') => `
https://gateway.marvel.com/v1/public
${urlpath}
?apikey=15e25fa93da9f3bd048534ec2c142957
&hash=97d2ce6f2a73c660d7aafd0e017acb42
&ts=1
${query}
`;

export const isEmpty = value => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}


