export class TreeNode {
  id: number = 0;
  description: string = '';
  name: string = ''
  next_level_privileges?: TreeNode[];
}