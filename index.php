<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
    <link rel="stylesheet" href="sty.css" />

    <title>Sliding puzzle</title>
</head>

<body>
    <div class="container justify-content-center">
        <div id="params">
            <input type="number" autofocus autocomplete="off" id="grid_size" max="99" class="text-center"/>
            <select id="mode">
                <option value="num">Numbers</option>
                <option value="pic">Picture</option>
            </select>
        </div>
        <div id="puzzle">
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script defer src="script.js"></script>

</body>

</html>