<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cryptocurrency Price</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f4f4f9;
            margin: 0;
        }

        #cryptoData {
            margin-top: 20px;
            text-align: center;
        }

        .crypto-item {
            margin: 10px;
        }

        .crypto-item p {
            font-size: 18px;
            margin: 5px;
        }

        button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }

        #errorMessage {
            color: red;
            font-size: 16px;
        }
    </style>
</head>
<body>

    <h1>Cryptocurrency Prices</h1>
    <button onclick="fetchCryptoData()">Fetch Prices</button>
    <div id="errorMessage"></div>
    <div id="cryptoData"></div>

    <script>
        const apiKey = 'a1225855-882b-429b-896c-b49424ed66fc'; // API Key شما

        async function fetchCryptoData() {
            const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}&start=1&limit=5&convert=USD`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.status.error_code === 0) {
                    displayCryptoData(data.data); // نمایش داده‌ها
                } else {
                    document.getElementById('errorMessage').textContent = `Error: ${data.status.error_message}`;
                }
            } catch (error) {
                document.getElementById('errorMessage').textContent = 'Error fetching data: ' + error;
            }
        }

        function displayCryptoData(cryptos) {
            const cryptoDataDiv = document.getElementById('cryptoData');
            cryptoDataDiv.innerHTML = ''; // پاک کردن محتوای قبلی

            cryptos.forEach(crypto => {
                const cryptoDiv = document.createElement('div');
                cryptoDiv.classList.add('crypto-item');
                
                const name = crypto.name;
                const price = crypto.quote.USD.price.toFixed(2);
                const symbol = crypto.symbol;

                cryptoDiv.innerHTML = `
                    <p><strong>${name} (${symbol})</strong></p>
                    <p>Price: $${price}</p>
                `;

                cryptoDataDiv.appendChild(cryptoDiv);
            });
        }
    </script>
</body>
</html>
