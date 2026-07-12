import java.util.*;

class Solution {
    public int strStr(String s, String t) {
        return s.indexOf(t);
    }
}
public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";String t=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().strStr(s,t)).append("\n");}System.out.print(sb);}}