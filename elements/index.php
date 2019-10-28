<?php

include 'inc/dbconn.php';

?>


<html>
<head>
<title>PeriodicTable</title>
<meta charset="UTF-8">
<link rel="stylesheet" href="css/style.css">

</head>
<body bgcolor='#d6c4c3'>
    <br />
    <br />
    <center>
        <hr />
        <table border="1" style="border-style:none;" cellspacing="0" cellpadding="10" width="70%">
            <tr>
                <td id="H" class="type3"><a href="elements/h.html">H</a></td>
                <td colspan="16" class="stype1"></td>
                <td id="He"class="type6"><a href="elements/he.html">He</a></td>
            </tr>

            <tr>
                <td id="Li"class="type4"><a href="elements/li.html">Li</a></td>
                <td id="Be"class="type5"><a href="elements/be.html">Be</a></td>
                <td colspan="10" class="stype1"></td>
                <td id="B"class="type9"><a href="elements/b.html">B</a></td>
                <td id="C"class="type3"><a href="elements/c.html">C</a></td>
                <td id="N"class="type3"><a href="elements/n.html">N</a></td>
                <td id="O"class="type3"><a href="elements/o.html">O</a></td>
                <td id="F"class="type10"><a href="elements/f.html">F</a></td>
                <td id="Ne"class="type6"><a href="elements/ne.html">Ne</a></td>
            </tr>

            <tr>
                <td id="Na"class="type4"><a href="elements/na.html">Na</a></td>
                <td id="Mg"class="type5"><a href="elements/mg.html">Mg</a></td>
                <td colspan="10" class="stype1"></td>
                <td id="Al"class="type2"><a href="elements/al.html">Al</a></td>
                <td id="Si"class="type9"><a href="elements/si.html">Si</a></td>
                <td id="P"class="type3"><a href="elements/p.html">P</a></td>
                <td id="S"class="type3"><a href="elements/s.html">S</a></td>
                <td id="Cl"class="type10"><a href="elements/cl.html">Cl</a></td>
                <td id="Ar"class="type6"><a href="elements/ar.html">Ar</a></td>
            </tr>

            <tr>
                <td id="K"class="type4"><a href="elements/k.html">K</a></td>
                <td id="Ca"class="type5"><a href="elements/ca.html">Ca</a></td>
                <td id="Sc"class="type1"><a href="elements/sc.html">Sc</a></td>
                <td id="Ti"class="type1"><a href="elements/ti.html">Ti</a></td>
                <td id="V"class="type1"><a href="elements/v.html">V</a></td>
                <td id="Cr"class="type1"><a href="elements/cr.html">Cr</a></td>
                <td id="Mn"class="type1"><a href="elements/mn.html">Mn</a></td>
                <td id="Fe"class="type1"><a href="elements/fe.html">Fe</a></td>
                <td id="Co"class="type1"><a href="elements/co.html">Co</a></td>
                <td id="Ni"class="type1"><a href="elements/ni.html">Ni</a></td>
                <td id="Cu"class="type1"><a href="elements/cu.html">Cu</a></td>
                <td id="Zn"class="type1"><a href="elements/zn.html">Zn</a></td>
                <td id="Ga"class="type2"><a href="elements/ga.html">Ga</a></td>
                <td id="Ge"class="type9"><a href="elements/ge.html">Ge</a></td>
                <td id="As"class="type9"><a href="elements/as.html">As</a></td>
                <td id="Se"class="type3"><a href="elements/se.html">Se</a></td>
                <td id="Br"class="type10"><a href="elements/br.html">Br</a></td>
                <td id="Kr"class="type6"><a href="elements/kr.html">Kr</a></td>
            </tr>

            <tr>
                <td id="Rb"class="type4"><a href="elements/rb.html">Rb</a></td>
                <td id="Sr"class="type5"><a href="elements/sr.html">Sr</a></td>
                <td id="Y"class="type1"><a href="elements/y.html">Y</a></td>
                <td id="Zr"class="type1"><a href="elements/zr.html">Zr</a></td>
                <td id="Nb"class="type1"><a href="elements/nb.html">Nb</a></td>
                <td id="Mo"class="type1"><a href="elements/mo.html">Mo</a></td>
                <td id="Tc"class="type1"><a href="elements/tc.html">Tc</a></td>
                <td id="Ru"class="type1"><a href="elements/ru.html">Ru</a></td>
                <td id="Rh"class="type1"><a href="elements/rh.html">Rh</a></td>
                <td id="Pd"class="type1"><a href="elements/pd.html">Pd</a></td>
                <td id="Ag"class="type1"><a href="elements/ag.html">Ag</a></td>
                <td id="Cd"class="type1"><a href="elements/cd.html">Cd</a></td>
                <td id="In"class="type2"><a href="elements/in.html">In</a></td>
                <td id="Sn"class="type2"><a href="elements/sn.html">Sn</a></td>
                <td id="Sb"class="type9"><a href="elements/sb.html">Sb</a></td>
                <td id="Te"class="type9"><a href="elements/te.html">Te</a></td>
                <td id="I"class="type10"><a href="elements/i.html">I</a></td>
                <td id="Xe"class="type6"><a href="elements/xe.html">Xe</a></td>
            </tr>

            <tr>
                <td id="Cs"class="type4"><a href="elements/cs.html">Cs</a></td>
                <td id="Ba"class="type5"><a href="elements/ba.html">Ba</a></td>
                <td id="La"class="type7"><a href="elements/la.html">La</a></td>
                <td id="Hf"class="type1"><a href="elements/hf.html">Hf</a></td>
                <td id="Ta"class="type1"><a href="elements/ta.html">Ta</a></td>
                <td id="W"class="type1"><a href="elements/w.html">W</a></td>
                <td id="Re"class="type1"><a href="elements/re.html">Re</a></td>
                <td id="Os"class="type1"><a href="elements/os.html">Os</a></td>
                <td id="Ir"class="type1"><a href="elements/ir.html">Ir</a></td>
                <td id="Pt"class="type1"><a href="elements/pt.html">Pt</a></td>
                <td id="Au"class="type1"><a href="elements/au.html">Au</a></td>
                <td id="Hg"class="type1"><a href="elements/hg.html">Hg</a></td>
                <td id="TI"class="type2"><a href="elements/ti.html">TI</a></td>
                <td id="Pb"class="type2"><a href="elements/pb.html">Pb</a></td>
                <td id="Bi"class="type2"><a href="elements/bi.html">Bi</a></td>
                <td id="Po"class="type9"><a href="elements/po.html">Po</a></td>
                <td id="At"class="type10"><a href="elements/at.html">At</a></td>
                <td id="Rn"class="type6"><a href="elements/rn.html">Rn</a></td>
            </tr>

            <tr>
                <td id="Fr"class="type4"><a href="elements/fr.html">Fr</a></td>
                <td id="Ra"class="type5"><a href="elements/ra.html">Ra</a></td>
                <td id="Ac"class="type8"><a href="elements/ac.html">Ac</a></td>
                <td id="Rf"class="type1"><a href="elements/rf.html">Rf</a></td>
                <td id="Db"class="type1"><a href="elements/dd.html">Db</a></td>
                <td id="Sg"class="type1"><a href="elements/sg.html">Sg</a></td>
                <td id="Bh"class="type1"><a href="elements/bh.html">Bh</a></td>
                <td id="Hs"class="type1"><a href="elements/hs.html">Hs</a></td>
                <td id="Mt"class="type1"><a href="elements/mt.html">Mt</a></td>
                <td id="Ds"class="type1"><a href="elements/ds.html">Ds</a></td>
                <td id="Rg"class="type1"><a href="elements/rg.html">Rg</a></td>
                <td id="cn"class="type1"><a href="elements/cn.html">cn</a></td>
                <td id="Nh"class="type2"><a href="elements/nh.html">Nh</a></td>
                <td id="FI"class="type2"><a href="elements/fi.html">FI</a></td>
                <td id="Mc"class="type2"><a href="elements/mc.html">Mc</a></td>
                <td id="Lv"class="type2"><a href="elements/lv.html">Lv</a></td>
                <td id="Ts"class="type10"><a href="elements/ts.html">Ts</a></td>
                <td id="Og"class="type6"><a href="elements/og.html">Og</a></td>
            </tr>

            <tr>
                <td colspan="18" class="stype2" style="border-right-style:none;"></td>
            </tr>

            <tr>
                <td colspan="4" class="stype2"></td>
                <td id="Ce"class="type7"><a href="elements/ce.html">Ce</a></td>
                <td id="Pr"class="type7"><a href="elements/pr.html">Pr</a></td>
                <td id="Nd"class="type7"><a href="elements/nd.html">Nd</a></td>
                <td id="Pm"class="type7"><a href="elements/pm.html">Pm</a></td>
                <td id="Sm"class="type7"><a href="elements/sm.html">Sm</a></td>
                <td id="Eu"class="type7"><a href="elements/eu.html">Eu</a></td>
                <td id="Gd"class="type7"><a href="elements/gd.html">Gd</a></td>
                <td id="Tb"class="type7"><a href="elements/tb.html">Tb</a></td>
                <td id="Dy"class="type7"><a href="elements/dy.html">Dy</a></td>
                <td id="Ho"class="type7"><a href="elements/ho.html">Ho</a></td>
                <td id="Er"class="type7"><a href="elements/er.html">Er</a></td>
                <td id="Tm"class="type7"><a href="elements/tm.html">Tm</a></td>
                <td id="Yb"class="type7"><a href="elements/yb.html">Yb</a></td>
                <td id="Lu"class="type7"><a href="elements/lu.html">Lu</a></td>
            </tr>

            <tr>
                <td colspan="4" class="stype2"></td>
                <td id="Th"class="type8"><a href="elements/th.html">Th</a></td>
                <td id="Pa"class="type8"><a href="elements/pa.html">Pa</a></td>
                <td id="U"class="type8"><a href="elements/u.html">U</a></td>
                <td id="Np"class="type8"><a href="elements/np.html">Np</a></td>
                <td id="Pu"class="type8"><a href="elements/pu.html">Pu</a></td>
                <td id="Am"class="type8"><a href="elements/am.html">Am</a></td>
                <td id="Cm"class="type8"><a href="elements/cm.html">Cm</a></td>
                <td id="Bk"class="type8"><a href="elements/bk.html">Bk</a></td>
                <td id="Cf"class="type8"><a href="elements/cf.html">Cf</a></td>
                <td id="Es"class="type8"><a href="elements/es.html">Es</a></td>
                <td id="Fm"class="type8"><a href="elements/fm.html">Fm</a></td>
                <td id="Md"class="type8"><a href="elements/md.html">Md</a></td>
                <td id="No"class="type8"><a href="elements/no.html">No</a></td>
                <td id="Lr"class="type8"><a href="elements/lr.html">Lr</a></td>
            </tr>
        </table>
        <br />
        <hr />

        <table border="1" cellspacing="0" cellpadding="9" width="70%">
            <tr>
                <td id="non_metals"class="type3">Non<br>Metals</td>
                <td id="alkali_metals"class="type4">Alkali<br>Metals</td>
                <td id="alkaline_metals"class="type5">Alkaline<br>EarthMetals</td>
                <td id="transition_metals"class="type1">Transition<br>Metals</td>
                <td id="basic_metals"class="type2">Basic<br>Metal</td>
                <td id="semi_metals"class="type9">Semi<br>Metals</td>
                <td id="halogens"class="type10">Halogens</td>
                <td id="nobel_gases"class="type6">NobleGases</td>
                <td id="lanthanides"class="type7">Lanthanides</td>
                <td id="actinides"class="type8">Actinides<br></td>
            </tr>
        </table>
        <hr />
    </center>
</body>

<?php
    include 'inc/footer.php' ;
?>