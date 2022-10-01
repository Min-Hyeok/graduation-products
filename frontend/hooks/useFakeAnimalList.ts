import { faker } from '@faker-js/faker';

const useFakeAnimalList = () => {
  const animalList: Array<AnimalList> = [];
  const getMultipleAnimalImage = (): Array<string> => {
    const loop = 12;
    const tmpAnimalArray = [];

    for (let i = 0; i < loop; i += 1) {
      tmpAnimalArray.push(faker.image.cats());
    }

    return tmpAnimalArray;
  };

  for (let i = 0; i < 20; i += 1) {
    animalList.push({
      index: i,
      images: getMultipleAnimalImage(),
      title: '고양이 분양합니다',
      varieties: faker.animal.cat(),
      age: Number((Math.random() * 10 + 1).toFixed(0)),
      price: Number((Math.random() * 1000000).toFixed(0)),
    });
  }

  return animalList;
};

export default useFakeAnimalList;
