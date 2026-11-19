import DevicePreviews from './DevicePreviews';

interface Props {
  accentColor: string;
}

const tiles = [
  {
    label: 'iPad',
    title: 'Mygra on iPad',
    src: '/video/mygra-preview-ipad.mp4',
    poster: '/video/mygra-preview-ipad-poster.webp',
    width: 810,
    height: 1080,
    frame: 'w-[255px]',
  },
  {
    label: 'iPhone Duo, unfolded',
    title: 'Mygra on iPhone Duo, unfolded',
    src: '/video/mygra-preview-duo-unfolded.mp4',
    poster: '/video/mygra-preview-duo-unfolded-poster.webp',
    width: 1280,
    height: 590,
    frame: 'w-[737px]',
  },
  {
    label: 'iPhone Duo, folded',
    title: 'Mygra on iPhone Duo, folded',
    src: '/video/mygra-preview-duo-folded.mp4',
    poster: '/video/mygra-preview-duo-folded-poster.webp',
    width: 540,
    height: 1170,
    frame: 'w-[157px]',
  },
];

/** Mygra's iPad and iPhone Duo App Previews. */
export default function MygraDevicePreviews({ accentColor }: Props) {
  return (
    <DevicePreviews
      accentColor={accentColor}
      intro="Thirty-second tours of Mygra on iPad and on iPhone Duo, folded and unfolded. Tap to play."
      tiles={tiles}
    />
  );
}
