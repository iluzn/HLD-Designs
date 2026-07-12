import java.util.*;

class Solution {
    public String makeGood(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (sb.length() > 0) {
                char t = sb.charAt(sb.length() - 1);
                if (t != c && Character.toLowerCase(t) == Character.toLowerCase(c)) { sb.deleteCharAt(sb.length() - 1); continue; }
            }
            sb.append(c);
        }
        return sb.toString();
    }
}
public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().makeGood(s)).append("\n");}System.out.print(sb);}}