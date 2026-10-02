<?php
// ============================================================
//  catalogo.php — productos para la tienda (landing)
//  Lee del sistema de gestión (MySQL). Sin credenciales acá.
// ============================================================
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$cand = [__DIR__.'/gestion/db.php', __DIR__.'/../gestion/db.php', dirname(__DIR__).'/gestion/db.php'];
$loaded = false;
foreach ($cand as $c) { if (is_file($c)) { require $c; $loaded = true; break; } }
if (!$loaded) { echo json_encode(['ok'=>false,'error'=>'db no encontrada']); exit; }

try {
  $rows = db()->query('SELECT id, nombre, brand, precio, img, cat, descripcion, stock FROM productos ORDER BY nombre')->fetchAll();
  $prod = [];
  foreach ($rows as $r) {
    $prod[] = [
      'id'    => $r['id'],
      'name'  => $r['nombre'],
      'brand' => $r['brand'],
      'price' => (float)$r['precio'],
      'img'   => $r['img'],
      'cat'   => $r['cat'],
      'desc'  => $r['descripcion'],
      'stock' => (int)$r['stock'],
    ];
  }
  echo json_encode(['ok'=>true,'productos'=>$prod], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
  echo json_encode(['ok'=>false,'error'=>$e->getMessage()]);
}
