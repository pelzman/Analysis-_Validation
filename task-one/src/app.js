import FileTree from './fileTree';

export function createFileTree(input) {

  let parentArray =[]
let childArray =[]
for(let i=0; i < input.length; i++){
  if(input[i]["parentId"]){
    childArray.push(input[i])
  }
  else{
    parentArray.push(input[i])
  }
}
for(let i = 0; i < parentArray.length; i++){
  for(let j=0; j < childArray.length; j++){
    if(parentArray[i].id === childArray[j].parentId){
      parentArray.push(childArray[j])
    }
  }
  input= parentArray
}


  const fileTree = new FileTree();

  for (const inputNode of input) {

  
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}