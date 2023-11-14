import currencyFormatter from 'currency-formatter';

const CurrencyFormat = (cantidad) => {
    // return cantidad.toLocaleString('es-MX', {
    //     style: 'currency',
    //     currency: 'MXN',
    // });
    const formattedAmount = currencyFormatter.format(cantidad, { code: 'MXN' });

    return formattedAmount;
}

export default CurrencyFormat;