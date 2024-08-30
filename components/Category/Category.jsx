import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";

const Category = () => {
  const CategoryArray = [
    { image: images.AI, name: "AI & ML" },
    { image: images.Datascience, name: "Data Science" },
    { image: images.web3, name: "WEB3" },
    { image: images.frameworks, name: "Frameworks" },
    { image: images.Dsa, name: "DSA" },
    { image: images.dev2, name: "Development" },
  ];

  return (
    <div className={Style.box_category}>
      <div className={Style.category}>
        {CategoryArray.map((category, i) => (
          <div className={Style.category_box} key={i}>
            <Image
              src={category.image}
              className={Style.category_box_img}
              alt="Background image"
              width={350}
              height={150}
              objectFit="cover"
            />

            <div className={Style.category_box_title}>
              <span>
                <BsCircleFill />
              </span>
              <div className={Style.category_box_title_info}>
                <h4>{category.name}</h4>
                <small>Exclusive </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
