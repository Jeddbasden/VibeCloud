'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { Album, } = require("../models");
    const demoAlbum = await Album.findOne({
      where: {
        title: "In Your Feels",
      },
    })
    
    return queryInterface.bulkInsert(
      "Songs",
      [
        {
          userId: 1,
          albumId: 1,
          title: "Inspired Thinking",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-05-05_-_Inspired_Thinking_-_www.FesliyanStudios.com_Steve_Oxen.mp3",
          imageUrl:
            "https://million-wallpapers.com/wallpapers/4/9/13106154638795609352/an-icy-blue-lake-among-snow-capped-mountains.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          userId: 1,
          albumId: 2,
          title: "Painful Memories",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-08-17_-_Painful_Memories_-_www.FesliyanStudios.com_Steve_Oxen.mp3",
          imageUrl:
            "http://wynwachhorst.com/wp-content/uploads/2013/09/nost-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          albumId: 1,
          title: "Cruisin Along",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-08-19_-_Cruisin_Along_-_www.FesliyanStudios.com_David_Renda.mp3",
          imageUrl:
            "https://pcgamestorrents.com/wp-content/uploads/2021/01/Sunset-Drive-1986-Torrent-Download.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          albumId: 2,
          title: "Looking Up",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-09-14_-_Looking_Up_-_www.FesliyanStudios.com_David_Renda.mp3",
          imageUrl:
            "https://mk0cs00242yfx7ww7i54.kinstacdn.com/wp-content/uploads/sites/5/star-gazing.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          albumId: 2,
          title: "Mellow Thoughts",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-09-14_-_Mellow_Thoughts_-_www.FesliyanStudios.com_David_Renda.mp3",
          imageUrl:
            "https://images.medicaldaily.com/sites/medicaldaily.com/files/styles/headline/public/2014/05/18/free-minded-meditation-allows-you-process-more-thoughts-and-feelings.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          albumId: 2,
          title: "Tropical Keys",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-09-14_-_Tropical_Keys_-_www.FesliyanStudios.com_David_Renda.mp3",
          imageUrl:
            "https://cdn.singulart.com/artworks/v2/cropped/3851/alts/zoom/alt_96833_fdeadf5c122995b797cb61a6dbefb0aa.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          albumId: 1,
          title: "Easy Going",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-09-30_-_Easy_Going_-_David_Fesliyan.mp3",
          imageUrl:
            "https://art.ngfiles.com/images/642000/642942_megatonslater_chill-time.png?f1537102612",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          albumId: 3,
          title: "Down Days",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-11-16_-_Down_Days_-_www.FesliyanStudios.com_David_Renda.mp3",
          imageUrl:
            "https://images.fineartamerica.com/images-medium-large/rainstorm-over-stenbury-down-alan-daysh.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          albumId: 3,
          title: "Reaching Out",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-11-17_-_Reaching_Out_-_www.FesliyanStudios.com_David_Renda.mp3",
          imageUrl:
            "https://3.bp.blogspot.com/_VtEtlcFd2N4/S7kITmGZ--I/AAAAAAAAAOc/PcOTVz8-qY8/s1600/reaching-hand1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          albumId: 3,
          title: "Time Alone",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-11-17_-_Time_Alone_-_www.FesliyanStudios.com_David_Renda.mp3",
          imageUrl:
            "https://cdn.tinybuddha.com/wp-content/uploads/2019/10/Woman-with-guitar.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          albumId: 3,
          title: "Steady Enjoyment",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2021-01-12_-_Steady_Enjoyment_-_www.FesliyanStudios.com_David_Renda.mp3",
          imageUrl:
            "https://photos.metrotimes.com/wp-content/uploads/2016/07/Versluis-Park.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          albumId: 1,
          title: "Tokyo Lo-Fi",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2021-03-18_-_Tokyo_Lo-Fi_-_www.FesliyanStudios.com_Steve_Oxen.mp3",
          imageUrl:
            "https://i.pinimg.com/736x/05/b4/0b/05b40b0274fcf04fbc013c25451e29a6.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          albumId: 3,
          title: "Rolling Hills Of Ireland",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2021-06-03_-_Rolling_Hills_Of_Ireland_-_www.FesliyanStudios.com.mp3",
          imageUrl:
            "https://i.pinimg.com/originals/88/e8/20/88e8204e6b0dcfe56f94675322fc01aa.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: "Experience",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/Ludovico+Einaudi+_+Experience.mp3",
          imageUrl:
            "http://wynwachhorst.com/wp-content/uploads/2013/09/nost-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Songs', null, {});
  }
};
