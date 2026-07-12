import java.util.*;

class Solution {
    public boolean backspaceCompare(String s, String t) {
        return build(s).equals(build(t));
    }
    String build(String x) {
        StringBuilder sb = new StringBuilder();
        for (char c : x.toCharArray()) {
            if (c == '#') { if (sb.length() > 0) sb.deleteCharAt(sb.length() - 1); }
            else sb.append(c);
        }
        return sb.toString();
    }
}
public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";String t=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().backspaceCompare(s,t)?"true":"false").append("\n");}System.out.print(sb);}}