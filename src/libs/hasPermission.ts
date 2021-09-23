import { permissions } from './constants';

export default function hasPermission(module: string, role: string, type: string): boolean {
  const permission = permissions[module];
  // console.log('permission', permission);
  // console.log('module', module);
  // console.log('module', role);
  // console.log('module', type);
  if (!permission || !permission[type]) {
    console.log(`\n(1) ${role} do not have permission to ${type}  for the module ${module}`);
    return false;
  }
  if (!permission[type].includes(role)) {
    console.log(`\n(2) ${role} do not have permission to ${type} for the module ${module}`);
    return false;
  }
  console.log(`\n (3) ${role} has permission to ${type} for the module ${module}`);
  return true;
}
