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
        <div id="params" class="row">
            <input type="number" autofocus autocomplete="off" id="grid_size" max="24" class="text-center col-2"/>
            <select id="mode" class="col-2">
                <option value="num">Numbers</option>
                <option value="pic">Picture</option>
            </select>
            <select id="dificulty" class="col-2">
                <option value="0">Easy</option>
                <option value="1">Medium</option>
                <option value="2">Hard</option>
            </select>
        <div id="timer" style="max-width:fit-content;" class="col-2"></div>
        <div id="moves" class="col-2"></div>
        <!-- <button id="solve" class="btn btn-dark col-2">Solve</button> -->
        </div>
        <div id="puzzle">
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script defer src="script.js"></script>

</body>

</html>