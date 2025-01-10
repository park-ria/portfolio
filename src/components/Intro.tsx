import styled from "styled-components";
import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  width: 100%;
  height: 2160px;
  background: #222;
  color: #fff;
  position: relative;
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const SvgArea = styled.div`
  width: fit-content;
  height: 1911px;
  position: absolute;
  bottom: 0;
  left: 400px;

  @media screen and (max-width: 1450px) {
    left: 90px;
  }
  @media screen and (max-width: 1024px) {
    left: -200px;
  }
  @media screen and (max-width: 640px) {
    left: -400px;
  }

  .load {
    width: 990px;
    height: 1911px;
    stroke-width: 2;
    fill: none;
    //stroke: #fff;
  }

  .plane {
    width: 90px;
    height: 90px;
    fill: ${({ theme }) => theme.accentColor};
    position: absolute;
    top: 0;
    left: 0;
    offset-path: path(
      "M2.34229 2C4.74202 25.9974 35.0128 52.2404 51.7091 68.5656C101.521 117.271 159.697 166.862 224.652 194.053C307.13 228.579 391.909 258.382 474.035 293.742C562.586 331.868 660.5 354.396 743.323 404.897C788.922 432.702 816.625 481.696 810.685 535.162C806.01 577.237 776.459 614.167 740.934 635.648C656.574 686.656 553.823 700.401 456.836 700.143C400.09 699.992 333.216 702.365 300.454 647.91C274.755 605.193 248.461 539.546 267.49 489.776C283.285 448.468 333.989 472.607 361.924 484.203C404.688 501.954 426.845 518.989 446.644 559.686C456.232 579.394 455.243 603.853 455.243 625.296C455.243 643.339 442.223 664.808 430.082 677.848C404.016 705.845 374.149 721.631 339.311 737.248C307.184 751.65 274.527 764.703 243.125 780.404C215.874 794.029 196.987 812.272 174.33 831.045C160.068 842.862 149.805 863.625 139.933 879.138C123.263 905.332 110.865 942.937 108.401 973.731C104.358 1024.28 107.844 1074.2 153.628 1104.95C171.759 1117.13 194.071 1124.5 213.824 1133.62C240.793 1146.06 268.927 1156.64 297.588 1164.51C334.89 1174.75 372.109 1182.07 410.017 1188.72C468.721 1199 528.951 1204.1 587.26 1216.11C612.903 1221.39 639.645 1225.71 664.336 1234.42C671.399 1236.91 685.491 1237.65 690.93 1242.54C697.42 1248.38 706.806 1251.6 713.862 1257.51C725.121 1266.94 735.944 1277.36 746.349 1287.77C776.537 1317.96 803.579 1358.18 817.055 1398.6C827.982 1431.39 827.884 1465.94 827.884 1500.2C827.884 1527.16 829.22 1554.5 827.724 1581.42C826.121 1610.28 810.16 1640.4 795.716 1664.55C773.171 1702.24 738.177 1736.58 697.937 1755C678.769 1763.78 661.989 1753.02 648.57 1739.08C614.189 1703.35 619.481 1630.14 642.997 1590.34C657.466 1565.85 687.578 1547.48 716.092 1554.99C749.277 1563.72 779.522 1589.4 805.589 1610.72C834.023 1633.99 859.994 1658.43 883.939 1686.21C920.409 1728.51 957.866 1779.17 973.436 1833.67C980.602 1858.75 980.163 1886.34 988.406 1911.06"
    );
    opacity: 0;
    @media screen and (max-width: 1024px) {
      height: 60px;
    }
    @media screen and (max-width: 1024px) {
      height: 60px;
    }
  }
`;

const Text1 = styled.svg<{ $fill: boolean }>`
  height: 112px;
  position: absolute;
  top: 500px;
  left: 50%;
  transform: translateX(-50%);
  fill: ${({ $fill, theme }) => ($fill ? theme.accentColor : "#fff")};

  @media screen and (max-width: 1450px) {
    height: 80px;
  }
  @media screen and (max-width: 1024px) {
    height: 50px;
  }
  @media screen and (max-width: 640px) {
    height: 35px;
    top: 550px;
  }
`;

const Text2 = styled.svg<{ $fill: boolean }>`
  height: 112px;
  position: absolute;
  top: 1000px;
  left: 200px;
  fill: ${({ $fill, theme }) => ($fill ? theme.accentColor : "#fff")};
  @media screen and (max-width: 1450px) {
    height: 80px;
    left: 100px;
  }
  @media screen and (max-width: 1024px) {
    height: 50px;
  }
  @media screen and (max-width: 640px) {
    height: 35px;
    top: 930px;
  }
`;

const Text3 = styled.svg<{ $fill: boolean }>`
  height: 112px;
  position: absolute;
  top: 1500px;
  right: 200px;
  fill: ${({ $fill, theme }) => ($fill ? theme.accentColor : "#fff")};
  @media screen and (max-width: 1450px) {
    height: 80px;
    right: 100px;
  }
  @media screen and (max-width: 1024px) {
    height: 50px;
  }
  @media screen and (max-width: 640px) {
    height: 35px;
  }
`;

const Intro = () => {
  const isDark = useRecoilValue(isDarkAtom);

  const loadRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);

  const textRef1 = useRef<SVGSVGElement>(null);
  const textRef2 = useRef<SVGSVGElement>(null);
  const textRef3 = useRef<SVGSVGElement>(null);

  const [fill1, setFill1] = useState(false);
  const [fill2, setFill2] = useState(false);
  const [fill3, setFill3] = useState(false);

  const { scrollYProgress } = useScroll({
    target: loadRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const updateOffsetDistance = (e: number) => {
      const text1Top = textRef1.current?.getBoundingClientRect().top || 0;
      const text2Top = textRef2.current?.getBoundingClientRect().top || 0;
      const text3Top = textRef3.current?.getBoundingClientRect().top || 0;
      const planeTop = planeRef.current?.getBoundingClientRect().top || 0;

      if (planeTop >= text1Top && textRef1.current) {
        setFill1(true);
      } else if (textRef1.current) {
        setFill1(false);
      }

      if (planeTop >= text2Top && textRef2.current) {
        setFill2(true);
      } else if (textRef2.current) {
        setFill2(false);
      }

      if (planeTop >= text3Top && textRef3.current) {
        setFill3(true);
      } else if (textRef3.current) {
        setFill3(false);
      }

      // planeRef 위치 및 불투명도 조정
      if (planeRef.current) {
        planeRef.current.style.offsetDistance = `${e * 99}%`;
        planeRef.current.style.opacity = e >= 1 ? "0" : "1";
      }
    };

    const unsubscribe = scrollYProgress.on("change", updateOffsetDistance);
    return () => unsubscribe();
  }, [scrollYProgress, isDark]);

  return (
    <Container ref={loadRef}>
      <SvgArea>
        <svg className="load" viewBox="0 0 990 1911">
          <motion.path d="M2.34229 2C4.74202 25.9974 35.0128 52.2404 51.7091 68.5656C101.521 117.271 159.697 166.862 224.652 194.053C307.13 228.579 391.909 258.382 474.035 293.742C562.586 331.868 660.5 354.396 743.323 404.897C788.922 432.702 816.625 481.696 810.685 535.162C806.01 577.237 776.459 614.167 740.934 635.648C656.574 686.656 553.823 700.401 456.836 700.143C400.09 699.992 333.216 702.365 300.454 647.91C274.755 605.193 248.461 539.546 267.49 489.776C283.285 448.468 333.989 472.607 361.924 484.203C404.688 501.954 426.845 518.989 446.644 559.686C456.232 579.394 455.243 603.853 455.243 625.296C455.243 643.339 442.223 664.808 430.082 677.848C404.016 705.845 374.149 721.631 339.311 737.248C307.184 751.65 274.527 764.703 243.125 780.404C215.874 794.029 196.987 812.272 174.33 831.045C160.068 842.862 149.805 863.625 139.933 879.138C123.263 905.332 110.865 942.937 108.401 973.731C104.358 1024.28 107.844 1074.2 153.628 1104.95C171.759 1117.13 194.071 1124.5 213.824 1133.62C240.793 1146.06 268.927 1156.64 297.588 1164.51C334.89 1174.75 372.109 1182.07 410.017 1188.72C468.721 1199 528.951 1204.1 587.26 1216.11C612.903 1221.39 639.645 1225.71 664.336 1234.42C671.399 1236.91 685.491 1237.65 690.93 1242.54C697.42 1248.38 706.806 1251.6 713.862 1257.51C725.121 1266.94 735.944 1277.36 746.349 1287.77C776.537 1317.96 803.579 1358.18 817.055 1398.6C827.982 1431.39 827.884 1465.94 827.884 1500.2C827.884 1527.16 829.22 1554.5 827.724 1581.42C826.121 1610.28 810.16 1640.4 795.716 1664.55C773.171 1702.24 738.177 1736.58 697.937 1755C678.769 1763.78 661.989 1753.02 648.57 1739.08C614.189 1703.35 619.481 1630.14 642.997 1590.34C657.466 1565.85 687.578 1547.48 716.092 1554.99C749.277 1563.72 779.522 1589.4 805.589 1610.72C834.023 1633.99 859.994 1658.43 883.939 1686.21C920.409 1728.51 957.866 1779.17 973.436 1833.67C980.602 1858.75 980.163 1886.34 988.406 1911.06" />
        </svg>
        <motion.svg ref={planeRef} className="plane" viewBox="0 0 155 155">
          <path d="M137.427 78.5454C137.442 77.6419 137.197 76.7532 136.719 75.9861C136.241 75.2191 135.552 74.6065 134.734 74.2222L59.185 38.5669L59.1741 38.5557C58.2991 38.1484 57.3196 38.0212 56.3696 38.1914C55.4195 38.3616 54.5451 38.8209 53.8659 39.5066C53.1866 40.1924 52.7356 41.0711 52.5745 42.0227C52.4133 42.9743 52.5498 43.9525 52.9654 44.8237L53.0028 44.8989L63.3954 72.143C63.6446 72.6295 64.017 73.0422 64.4755 73.3398C64.934 73.6374 65.4625 73.8096 66.0083 73.8391L124.754 76.9368C124.935 76.94 125.114 76.9788 125.281 77.0511C125.447 77.1234 125.597 77.2278 125.723 77.3583C125.849 77.4887 125.948 77.6427 126.015 77.8115C126.081 77.9802 126.114 78.1604 126.111 78.3417C126.108 78.5231 126.069 78.702 125.997 78.8683C125.924 79.0346 125.82 79.1851 125.689 79.3111C125.559 79.4371 125.405 79.5362 125.236 79.6026C125.068 79.6691 124.887 79.7017 124.706 79.6986L65.9008 80.7367C65.3543 80.7472 64.8201 80.9008 64.3515 81.1823C63.883 81.4638 63.4964 81.8633 63.2305 82.3409L51.8882 109.221C51.8683 109.256 51.8511 109.289 51.8339 109.325C50.9658 111.032 51.1461 113.057 52.4126 114.493L52.5483 114.633C53.2149 115.331 54.0762 115.813 55.0201 116.015C55.964 116.217 56.9469 116.13 57.841 115.767L134.566 82.7721C135.4 82.4193 136.114 81.8324 136.622 81.0823C137.13 80.3322 137.409 79.451 137.427 78.5454Z" />
        </motion.svg>
      </SvgArea>

      <Text1 $fill={fill1} ref={textRef1} viewBox="0 0 1398 112">
        <path d="M112.622 0.291997H142.724L119.06 112H84.086L71.732 45.358L59.378 112H24.404L0.74 0.291997H32.408L41.804 75.46L56.768 0.291997H86.522L101.486 75.46L112.622 0.291997ZM203.613 46.054V67.804H172.293V46.054H203.613ZM147.933 0.291997H177.861V112H147.933V0.291997ZM199.785 0.291997H229.713V112H199.785V0.291997ZM308.501 73.72V95.296H252.647V73.72H308.501ZM327.641 112H297.017L280.313 33.526L263.087 112H233.159L261.869 0.291997H298.931L327.641 112ZM346.428 10.732H376.878V112H346.428V10.732ZM398.454 0.291997V22.042H325.026V0.291997H398.454ZM482.293 46.924V24.13C482.293 22.854 481.945 21.926 481.249 21.346C480.553 20.65 479.451 20.302 477.943 20.302H445.927V0.291997H487.165C496.445 0.291997 502.999 2.264 506.827 6.20799C510.771 10.152 512.743 15.372 512.743 21.868V46.924H482.293ZM482.293 88.162V44.662H512.743V90.424C512.743 96.92 510.771 102.14 506.827 106.084C502.999 110.028 496.445 112 487.165 112H445.927V91.99H477.943C479.451 91.99 480.553 91.7 481.249 91.12C481.945 90.424 482.293 89.438 482.293 88.162ZM435.835 0.291997H466.285V112H435.835V0.291997ZM568.649 46.924V25.87C568.649 24.594 568.301 23.666 567.605 23.086C566.909 22.39 565.807 22.042 564.299 22.042H558.557V0.291997H573.521C582.801 0.291997 589.355 2.264 593.183 6.20799C597.127 10.152 599.099 15.372 599.099 21.868V46.924H568.649ZM568.649 86.422V44.662H599.099V90.424C599.099 96.92 597.127 102.14 593.183 106.084C589.355 110.028 582.801 112 573.521 112H558.557V90.25H564.299C565.807 90.25 566.909 89.96 567.605 89.38C568.301 88.684 568.649 87.698 568.649 86.422ZM552.641 25.87V46.924H522.191V21.868C522.191 15.372 524.105 10.152 527.933 6.20799C531.877 2.264 538.489 0.291997 547.769 0.291997H562.733V22.042H556.991C555.483 22.042 554.381 22.39 553.685 23.086C552.989 23.666 552.641 24.594 552.641 25.87ZM552.641 44.662V86.422C552.641 87.698 552.989 88.684 553.685 89.38C554.381 89.96 555.483 90.25 556.991 90.25H562.733V112H547.769C538.489 112 531.877 110.028 527.933 106.084C524.105 102.14 522.191 96.92 522.191 90.424V44.662H552.641ZM692.506 80.854H666.232L633.346 0.291997H664.492L679.108 47.446L692.68 0.291997H723.652L692.506 80.854ZM664.144 64.672H694.594V112H664.144V64.672ZM772.99 46.924V25.87C772.99 24.594 772.642 23.666 771.946 23.086C771.25 22.39 770.148 22.042 768.64 22.042H762.898V0.291997H777.862C787.142 0.291997 793.696 2.264 797.524 6.20799C801.468 10.152 803.44 15.372 803.44 21.868V46.924H772.99ZM772.99 86.422V44.662H803.44V90.424C803.44 96.92 801.468 102.14 797.524 106.084C793.696 110.028 787.142 112 777.862 112H762.898V90.25H768.64C770.148 90.25 771.25 89.96 771.946 89.38C772.642 88.684 772.99 87.698 772.99 86.422ZM756.982 25.87V46.924H726.532V21.868C726.532 15.372 728.446 10.152 732.274 6.20799C736.218 2.264 742.83 0.291997 752.11 0.291997H767.074V22.042H761.332C759.824 22.042 758.722 22.39 758.026 23.086C757.33 23.666 756.982 24.594 756.982 25.87ZM756.982 44.662V86.422C756.982 87.698 757.33 88.684 758.026 89.38C758.722 89.96 759.824 90.25 761.332 90.25H767.074V112H752.11C742.83 112 736.218 110.028 732.274 106.084C728.446 102.14 726.532 96.92 726.532 90.424V44.662H756.982ZM859.751 86.422V0.291997H890.201V90.424C890.201 96.92 888.229 102.14 884.285 106.084C880.457 110.028 873.903 112 864.623 112H849.659V90.25H855.401C856.909 90.25 858.011 89.96 858.707 89.38C859.403 88.684 859.751 87.698 859.751 86.422ZM843.743 0.291997V86.422C843.743 87.698 844.091 88.684 844.787 89.38C845.483 89.96 846.585 90.25 848.093 90.25H853.835V112H838.871C829.591 112 822.979 110.028 819.035 106.084C815.207 102.14 813.293 96.92 813.293 90.424V0.291997H843.743ZM1038.74 0.291997H1068.84L1045.18 112H1010.2L997.847 45.358L985.493 112H950.519L926.855 0.291997H958.523L967.919 75.46L982.883 0.291997H1012.64L1027.6 75.46L1038.74 0.291997ZM1142.43 73.72V95.296H1086.58V73.72H1142.43ZM1161.57 112H1130.95L1114.24 33.526L1097.02 112H1067.09L1095.8 0.291997H1132.86L1161.57 112ZM1216.03 0.291997H1243.87V112H1217.77L1192.88 53.362V112H1165.04V0.291997H1191.14L1216.03 59.974V0.291997ZM1269.65 10.732H1300.1V112H1269.65V10.732ZM1321.68 0.291997V22.042H1248.25V0.291997H1321.68ZM1366.68 41.008V24.13C1366.68 22.854 1366.34 21.926 1365.64 21.346C1364.94 20.65 1363.84 20.302 1362.33 20.302H1358.51V0.291997H1371.56C1380.84 0.291997 1387.39 2.264 1391.22 6.20799C1395.16 10.152 1397.13 15.372 1397.13 21.868V39.268C1397.13 45.764 1395.16 50.984 1391.22 54.928C1387.39 58.872 1380.84 60.844 1371.56 60.844H1352.76V44.836H1362.33C1363.84 44.836 1364.94 44.546 1365.64 43.966C1366.34 43.27 1366.68 42.284 1366.68 41.008ZM1343.19 44.836H1373.99L1371.21 71.458H1345.8L1343.19 44.836ZM1343.19 112V83.464H1373.12V112H1343.19ZM1352.94 24.13V35.962H1322.49V21.868C1322.49 15.372 1324.4 10.152 1328.23 6.20799C1332.17 2.264 1338.79 0.291997 1348.07 0.291997H1359.03V20.302H1357.29C1355.78 20.302 1354.68 20.65 1353.98 21.346C1353.29 21.926 1352.94 22.854 1352.94 24.13Z" />
      </Text1>

      <Text2 $fill={fill2} ref={textRef2} viewBox="0 0 763 113">
        <path d="M0.96 0.479985H31.41V112.188H0.96V0.479985ZM63.078 49.374V69.384H14.184V49.374H63.078ZM67.95 0.479985V22.23H11.748V0.479985H67.95ZM120.921 47.982V26.058C120.921 24.782 120.573 23.854 119.877 23.274C119.181 22.578 118.079 22.23 116.571 22.23H84.2068V0.479985H125.793C135.073 0.479985 141.627 2.45198 145.455 6.39598C149.399 10.34 151.371 15.56 151.371 22.056V50.94C151.371 57.436 149.399 62.656 145.455 66.6C141.627 70.544 135.073 72.516 125.793 72.516H84.2068V51.81H116.571C118.079 51.81 119.181 51.52 119.877 50.94C120.573 50.244 120.921 49.258 120.921 47.982ZM74.1148 0.479985H104.565V112.188H74.1148V0.479985ZM101.085 60.336H130.839L156.939 112.188H124.227L101.085 60.336ZM205.95 47.112V26.058C205.95 24.782 205.602 23.854 204.906 23.274C204.21 22.578 203.108 22.23 201.6 22.23H195.858V0.479985H210.822C220.102 0.479985 226.656 2.45198 230.484 6.39598C234.428 10.34 236.4 15.56 236.4 22.056V47.112H205.95ZM205.95 86.61V44.85H236.4V90.612C236.4 97.108 234.428 102.328 230.484 106.272C226.656 110.216 220.102 112.188 210.822 112.188H195.858V90.438H201.6C203.108 90.438 204.21 90.148 204.906 89.568C205.602 88.872 205.95 87.886 205.95 86.61ZM189.942 26.058V47.112H159.492V22.056C159.492 15.56 161.406 10.34 165.234 6.39598C169.178 2.45198 175.79 0.479985 185.07 0.479985H200.034V22.23H194.292C192.784 22.23 191.682 22.578 190.986 23.274C190.29 23.854 189.942 24.782 189.942 26.058ZM189.942 44.85V86.61C189.942 87.886 190.29 88.872 190.986 89.568C191.682 90.148 192.784 90.438 194.292 90.438H200.034V112.188H185.07C175.79 112.188 169.178 110.216 165.234 106.272C161.406 102.328 159.492 97.108 159.492 90.612V44.85H189.942ZM297.234 0.479985H325.074V112.188H298.974L274.092 53.55V112.188H246.252V0.479985H272.352L297.234 60.162V0.479985ZM350.862 10.92H381.312V112.188H350.862V10.92ZM402.888 0.479985V22.23H329.46V0.479985H402.888ZM438.529 0.479985H468.979V112.188H438.529V0.479985ZM500.473 45.024V66.774H451.579V45.024H500.473ZM505.519 0.479985V22.23H449.317V0.479985H505.519ZM507.085 90.438V112.188H449.317V90.438H507.085ZM564.195 0.479985H592.035V112.188H565.935L541.053 53.55V112.188H513.213V0.479985H539.313L564.195 60.162V0.479985ZM650.709 47.112V24.318C650.709 23.042 650.361 22.114 649.665 21.534C648.969 20.838 647.867 20.49 646.359 20.49H614.343V0.479985H655.581C664.861 0.479985 671.415 2.45198 675.243 6.39598C679.187 10.34 681.159 15.56 681.159 22.056V47.112H650.709ZM650.709 88.35V44.85H681.159V90.612C681.159 97.108 679.187 102.328 675.243 106.272C671.415 110.216 664.861 112.188 655.581 112.188H614.343V92.178H646.359C647.867 92.178 648.969 91.888 649.665 91.308C650.361 90.612 650.709 89.626 650.709 88.35ZM604.251 0.479985H634.701V112.188H604.251V0.479985ZM731.844 41.196V24.318C731.844 23.042 731.496 22.114 730.8 21.534C730.104 20.838 729.002 20.49 727.494 20.49H723.666V0.479985H736.716C745.996 0.479985 752.55 2.45198 756.378 6.39598C760.322 10.34 762.294 15.56 762.294 22.056V39.456C762.294 45.952 760.322 51.172 756.378 55.116C752.55 59.06 745.996 61.032 736.716 61.032H717.924V45.024H727.494C729.002 45.024 730.104 44.734 730.8 44.154C731.496 43.458 731.844 42.472 731.844 41.196ZM708.354 45.024H739.152L736.368 71.646H710.964L708.354 45.024ZM708.354 112.188V83.652H738.282V112.188H708.354ZM718.098 24.318V36.15H687.648V22.056C687.648 15.56 689.562 10.34 693.39 6.39598C697.334 2.45198 703.946 0.479985 713.226 0.479985H724.188V20.49H722.448C720.94 20.49 719.838 20.838 719.142 21.534C718.446 22.114 718.098 23.042 718.098 24.318Z" />
      </Text2>

      <Text3 $fill={fill3} ref={textRef3} viewBox="0 0 705 112">
        <path d="M0.313985 0.291997H51.47C60.75 0.291997 67.304 2.264 71.132 6.20799C75.076 10.152 77.048 15.372 77.048 21.868V36.136C77.048 40.66 76.468 44.604 75.308 47.968C74.264 51.332 72.06 53.942 68.696 55.798C72.06 57.306 74.264 59.568 75.308 62.584C76.468 65.6 77.048 69.312 77.048 73.72V90.424C77.048 96.92 75.076 102.14 71.132 106.084C67.304 110.028 60.75 112 51.47 112H0.313985V0.291997ZM47.12 88.162V69.892C47.12 68.616 46.772 67.688 46.076 67.108C45.38 66.412 44.278 66.064 42.77 66.064H30.242V91.99H42.77C44.278 91.99 45.38 91.7 46.076 91.12C46.772 90.424 47.12 89.438 47.12 88.162ZM47.12 42.226V24.13C47.12 22.854 46.772 21.926 46.076 21.346C45.38 20.65 44.278 20.302 42.77 20.302H30.242V46.054H42.77C44.278 46.054 45.38 45.764 46.076 45.184C46.772 44.488 47.12 43.502 47.12 42.226ZM154.935 73.72V95.296H99.0807V73.72H154.935ZM174.075 112H143.451L126.747 33.526L109.521 112H79.5927L108.303 0.291997H145.365L174.075 112ZM207.129 24.13V88.162C207.129 89.438 207.477 90.424 208.173 91.12C208.869 91.7 209.971 91.99 211.479 91.99H216.003V112H202.257C192.977 112 186.365 110.028 182.421 106.084C178.593 102.14 176.679 96.92 176.679 90.424V21.868C176.679 15.372 178.593 10.152 182.421 6.20799C186.365 2.264 192.977 0.291997 202.257 0.291997H216.003V20.302H211.479C209.971 20.302 208.869 20.65 208.173 21.346C207.477 21.926 207.129 22.854 207.129 24.13ZM221.919 42.052V24.13C221.919 22.854 221.571 21.926 220.875 21.346C220.179 20.65 219.077 20.302 217.569 20.302H213.045V0.291997H226.791C236.071 0.291997 242.625 2.264 246.453 6.20799C250.397 10.152 252.369 15.372 252.369 21.868V42.052H221.919ZM221.919 88.162V70.936H252.369V90.424C252.369 96.92 250.397 102.14 246.453 106.084C242.625 110.028 236.071 112 226.791 112H213.045V91.99H217.569C219.077 91.99 220.179 91.7 220.875 91.12C221.571 90.424 221.919 89.438 221.919 88.162ZM290.844 54.928H322.512L344.436 112H311.724L290.844 54.928ZM322.512 54.928H290.844L311.55 0.291997H344.262L322.512 54.928ZM260.22 0.291997H290.67V112H260.22V0.291997ZM380.361 0.291997H410.811V112H380.361V0.291997ZM442.305 44.836V66.586H393.411V44.836H442.305ZM447.351 0.291997V22.042H391.149V0.291997H447.351ZM448.917 90.25V112H391.149V90.25H448.917ZM506.027 0.291997H533.867V112H507.767L482.885 53.362V112H455.045V0.291997H481.145L506.027 59.974V0.291997ZM592.541 46.924V24.13C592.541 22.854 592.193 21.926 591.497 21.346C590.801 20.65 589.699 20.302 588.191 20.302H556.175V0.291997H597.413C606.693 0.291997 613.247 2.264 617.075 6.20799C621.019 10.152 622.991 15.372 622.991 21.868V46.924H592.541ZM592.541 88.162V44.662H622.991V90.424C622.991 96.92 621.019 102.14 617.075 106.084C613.247 110.028 606.693 112 597.413 112H556.175V91.99H588.191C589.699 91.99 590.801 91.7 591.497 91.12C592.193 90.424 592.541 89.438 592.541 88.162ZM546.083 0.291997H576.533V112H546.083V0.291997ZM673.676 41.008V24.13C673.676 22.854 673.328 21.926 672.632 21.346C671.936 20.65 670.834 20.302 669.326 20.302H665.498V0.291997H678.548C687.828 0.291997 694.382 2.264 698.21 6.20799C702.154 10.152 704.126 15.372 704.126 21.868V39.268C704.126 45.764 702.154 50.984 698.21 54.928C694.382 58.872 687.828 60.844 678.548 60.844H659.756V44.836H669.326C670.834 44.836 671.936 44.546 672.632 43.966C673.328 43.27 673.676 42.284 673.676 41.008ZM650.186 44.836H680.984L678.2 71.458H652.796L650.186 44.836ZM650.186 112V83.464H680.114V112H650.186ZM659.93 24.13V35.962H629.48V21.868C629.48 15.372 631.394 10.152 635.222 6.20799C639.166 2.264 645.778 0.291997 655.058 0.291997H666.02V20.302H664.28C662.772 20.302 661.67 20.65 660.974 21.346C660.278 21.926 659.93 22.854 659.93 24.13Z" />
      </Text3>
    </Container>
  );
};

export default Intro;
