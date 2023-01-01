import './style.css';
import LandingSection from '../../components/LandingSection';
import LandingBody from '../../components/LandingBody/intex';
import LangMusic from '../../components/LangMusic';
import LangIcon from '../../components/LangIcon';
import MusicIcon from '../../components/MusicIcon';
export default function LandingPage() {
  // type titleType = {
  //   code: string;
  //   title: string;
  // };
  // const titles: titleType[] = [
  //   {
  //     code: 'en',
  //     title: 'WEDDING INVITATION',
  //   },
  //   {
  //     code: 'id',
  //     title: 'UNDANGAN PERNIKAHAN',
  //   },
  // ];
  // const getTitle = (code: string) => {
  //   const title = titles.find((title) => title.code === code);
  //   return title?.title;
  // };
  // const [code, setCode] = useState('en');
  // const title = getTitle(code);
  return (
    <LandingSection>
      <LangMusic>
        <LangIcon></LangIcon>
        <MusicIcon></MusicIcon>
      </LangMusic>
      <LandingBody></LandingBody>
    </LandingSection>
  );
}
