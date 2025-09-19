import { NextApiRequest, NextApiResponse } from 'next';
import * as player from 'play-sound';

const playerOptions = {};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const play = player(playerOptions);

  const audioFilePath = 'output.mp3';

  play.play(audioFilePath, (err: any) => {
    if (err) {
      console.error(`Error playing audio: ${err}`);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Audio played successfully');
      res.status(200).json({ message: 'Audio played successfully' });
    }
  });
};
