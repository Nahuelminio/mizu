<?php
// ============================================================
//  estado.php — devuelve disponibilidad de stock para la tienda
//  (reusa la conexión del panel de gestión; no guarda credenciales)
// ============================================================
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

// Busca la conexión del panel en las ubicaciones habituales.
$cand = [
  __DIR__ . '/gestion/db.php',
  __DIR__ . '/../gestion/db.php',
  dirname(__DIR__) . '/gestion/db.php',
];
$loaded = false;
foreach ($cand as $c) { if (is_file($c)) { require $c; $loaded = true; break; } }
if (!$loaded) { echo json_encode(['ok' => false, 'error' => 'db no encontrada']); exit; }

try {
  $rows = db()->query('SELECT id, stock FROM productos')->fetchAll();
  $map = [];
  foreach ($rows as $r) { $map[$r['id']] = ((int)$r['stock'] > 0); } // true = hay stock
  echo json_encode(['ok' => true, 'stock' => $map], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
  echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}
