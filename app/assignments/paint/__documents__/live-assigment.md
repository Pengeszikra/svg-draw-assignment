# live assigment : count of oxygen

```typescript
enum ATOM { OXYGEN, ANOTHER_ATOM }

type Hash:string;

interface MoleculeNode {
	hash: Hash;
  atom: Atom;
  connectionList: Hash[];  
}

const singleOxygen:MoleculeNode = {
	atom: ATOM.OXYGEN,
  connectionList: [],
  isRepeat: true,
};

const atomList:MoleculeNode[] = [
    {atom: ATOM.ANOTHER_ATOM, hash:'C1', connectionList['C5', 'C2']},
    {atom: ATOM.ANOTHER_ATOM, hash:'C2'},
    {atom: ATOM.OXYGEN, hash:'O1'},
    {atom: ATOM.ANOTHER_ATOM, hash:'C3'},
    {atom: ATOM.ANOTHER_ATOM, hash:'C4'},
    {atom: ATOM.ANOTHER_ATOM, hash:'C5'},	
];

const countOxygen = (moleculeList: MoleculeNode[]) => moleculeList.reduce(
 (countOfOxygen, node) => countOfOxygen + node.atom === ATOM.OXYGEN ? 1 : 0
 ,0
);
```